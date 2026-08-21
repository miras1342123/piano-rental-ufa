interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 ${className}`}>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-graphite leading-tight tracking-tight">
        {title}
      </h2>
      <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-brass/40 via-brass to-brass/40" />
      {subtitle && (
        <p className="mt-5 text-lg text-graphite/70">{subtitle}</p>
      )}
    </div>
  );
}