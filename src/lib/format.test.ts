import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { tempoRelativo } from "./format";

describe("tempoRelativo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-12T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mostra 'agora' pra menos de 1 minuto", () => {
    expect(tempoRelativo("2026-07-12T11:59:30Z")).toBe("agora");
  });

  it("mostra minutos até 1 hora", () => {
    expect(tempoRelativo("2026-07-12T11:45:00Z")).toBe("15 min atrás");
  });

  it("mostra horas até 1 dia", () => {
    expect(tempoRelativo("2026-07-12T07:00:00Z")).toBe("5h atrás");
  });

  it("mostra dias até 30 dias", () => {
    expect(tempoRelativo("2026-07-09T12:00:00Z")).toBe("3d atrás");
  });

  it("não quebra com data no futuro (relógio dessincronizado)", () => {
    expect(tempoRelativo("2026-07-12T12:05:00Z")).toBe("agora");
  });
});
