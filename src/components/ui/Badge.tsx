interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const base = 'inline-block px-3 py-1 text-xs font-medium rounded-full';
  const variants = {
    primary: 'bg-brass/10 text-brass',
    outline: 'border border-brass/30 text-brass',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}