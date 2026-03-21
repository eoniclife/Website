"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface ButtonProps extends BaseProps, ComponentPropsWithoutRef<"button"> {
  href?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
}

function classes(variant: Variant) {
  const base =
    "inline-flex min-h-[52px] items-center justify-center rounded-button px-6 py-3 text-sm font-medium transition duration-200";
  const variants: Record<Variant, string> = {
    primary: "bg-eonic-teal text-eonic-bg hover:opacity-90 shadow-glow-teal",
    secondary: "border border-eonic-border-active bg-eonic-teal-dim text-eonic-text hover:bg-eonic-teal/20",
    ghost: "border border-eonic-border bg-transparent text-eonic-text-2 hover:border-eonic-border-active hover:text-eonic-text",
  };
  return cn(base, variants[variant]);
}

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  if ("href" in props) {
    const { href, children, className } = props;
    return (
      <Link href={href} className={cn(classes(variant), className)}>
        {children}
      </Link>
    );
  }

  const { children, className, type = "button", ...rest } = props;
  return (
    <button type={type} className={cn(classes(variant), className)} {...rest}>
      {children}
    </button>
  );
}
