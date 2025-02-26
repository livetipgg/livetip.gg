interface SectionCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  className,
  title,
  description,
}) => {
  return (
    <div
      className={`border p-5 bg-card-custom rounded-lg flex flex-col ${className}`}
    >
      <strong className="mb-3">{title}</strong>
      {description && (
        <span className="my-10 text-muted-foreground">{description}</span>
      )}
      {children}
    </div>
  );
};
