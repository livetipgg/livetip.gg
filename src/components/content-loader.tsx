import { LoaderCircle } from "lucide-react";

interface ContentLoaderProps {
  message?: string;
}

const ContentLoader = ({ message }: ContentLoaderProps) => {
  return (
    <div className="flex items-center justify-center bg-muted/40 p-4 rounded-lg">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      {message}
    </div>
  );
};

export default ContentLoader;
