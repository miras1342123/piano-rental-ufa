import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-premium focus:outline-none focus:ring-2 focus:ring-brass/50 disabled:opacity-50';

  const variants = {
    primary:
      'btn-shine bg-brass text-white hover:bg-brass/95 shadow-sm hover:shadow-lg hover:shadow-brass/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0',
    outline:
      'border-2 border-graphite/20 text-graphite hover:border-brass hover:text-brass hover:bg-brass/5 hover:-translate-y-0.5 active:scale-95 active:translate-y-0',
    ghost:
      'text-graphite/70 hover:text-brass hover:bg-brass/5 active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}