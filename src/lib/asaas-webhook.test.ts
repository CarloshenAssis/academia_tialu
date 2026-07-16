import { describe, it, expect } from "vitest";
import { statusParaEvento, validarCpfCnpj } from "./asaas-webhook";

describe("statusParaEvento (webhook do Asaas)", () => {
  it("ativa o plano quando o pagamento é confirmado ou recebido", () => {
    expect(statusParaEvento("PAYMENT_CONFIRMED")).toBe("ativo");
    expect(statusParaEvento("PAYMENT_RECEIVED")).toBe("ativo");
  });

  it("marca como atrasado quando a cobrança vence sem pagamento", () => {
    expect(statusParaEvento("PAYMENT_OVERDUE")).toBe("atrasado");
  });

  it("cancela quando a cobrança é estornada ou removida", () => {
    expect(statusParaEvento("PAYMENT_REFUNDED")).toBe("cancelado");
    expect(statusParaEvento("PAYMENT_DELETED")).toBe("cancelado");
  });

  it("ignora eventos que não afetam o acesso", () => {
    expect(statusParaEvento("PAYMENT_CREATED")).toBeNull();
    expect(statusParaEvento("PAYMENT_UPDATED")).toBeNull();
    expect(statusParaEvento("QUALQUER_COISA")).toBeNull();
  });

  it("ignora evento ausente", () => {
    expect(statusParaEvento(undefined)).toBeNull();
    expect(statusParaEvento("")).toBeNull();
  });
});

describe("validarCpfCnpj", () => {
  it("aceita CPF com 11 dígitos, com ou sem máscara", () => {
    expect(validarCpfCnpj("111.444.777-35")).toBe("11144477735");
    expect(validarCpfCnpj("11144477735")).toBe("11144477735");
  });

  it("aceita CNPJ com 14 dígitos", () => {
    expect(validarCpfCnpj("12.345.678/0001-95")).toBe("12345678000195");
  });

  it("rejeita tamanhos errados e vazio", () => {
    expect(validarCpfCnpj("123")).toBeNull();
    expect(validarCpfCnpj("")).toBeNull();
    expect(validarCpfCnpj("123456789012")).toBeNull();
    expect(validarCpfCnpj("abc")).toBeNull();
  });
});
