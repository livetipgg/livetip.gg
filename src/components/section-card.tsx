interface SectionCardProps {
  children: React.ReactNode;
  title: string;
  description;
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
      <strong>{title}</strong>
      <span className="my-10 text-muted-foreground">{description}</span>
      {children}
    </div>
  );
};
