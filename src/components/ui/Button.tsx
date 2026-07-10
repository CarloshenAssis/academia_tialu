import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "gold" | "navy" | "ghost";

const variantClasses: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-dark active:bg-gold-dark",
  navy: "bg-navy text-cream hover:bg-navy-light active:bg-navy-light",
  ghost: "bg-transparent text-navy underline underline-offset-4 hover:text-navy-light",
};

const baseClasses =
  "inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = "navy", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "navy",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}
