import { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div className={`max-w-6xl mx-auto px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
