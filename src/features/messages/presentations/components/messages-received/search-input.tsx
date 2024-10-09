import { Input } from "@/components/ui/input";
import React from "react";

interface SearchInputProps {
  query: string;
  onSearch: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onSearch,
  onSubmit,
}) => (
  <Input
    value={query}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    }}
    onChange={(e) => onSearch(e.target.value)}
    placeholder="Pesquisar"
    className="w-full lg:w-[320px] bg-white dark:bg-black"
  />
);

export default SearchInput;
