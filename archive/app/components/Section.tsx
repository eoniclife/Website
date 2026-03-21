import { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = '', ...props }: SectionProps) {
  return (
    <section className={`w-full ${className}`} {...props}>
      {children}
    </section>
  );
}
