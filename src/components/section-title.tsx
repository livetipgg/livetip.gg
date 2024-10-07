import { Title } from "./title";

interface SectionTitleProps {
  title: string;
  actions?: React.ReactNode;
}

export const SectionTitle = ({ title, actions }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-10 flex-wrap">
      <Title title={title} />
      <div className="flex items-center gap-2 w-full md:w-fit">{actions}</div>
    </div>
  );
};
