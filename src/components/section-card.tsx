interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`border p-5 bg-muted/40 rounded-lg flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};
