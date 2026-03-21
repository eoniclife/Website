import { ButtonHTMLAttributes, ReactNode } from 'react';

const variantClasses: Record<string, string> = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 focus:ring-teal-500',
  secondary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900 focus:ring-slate-500',
  outline:
    'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-base transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
    variantClasses[variant] || variantClasses.primary,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
