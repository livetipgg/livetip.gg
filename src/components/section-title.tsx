import { Title } from "./title";

interface SectionTitleProps {
  title: string;
  actions?: React.ReactNode;
}

export const SectionTitle = ({ title, actions }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <Title title={title} />
      {actions}
    </div>
  );
};
