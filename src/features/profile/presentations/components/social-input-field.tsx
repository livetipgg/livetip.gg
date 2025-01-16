import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ReactElement } from "react";

interface SocialInputFieldProps {
  label?: string;
  iconUrl: string;
  iconComponent?: ReactElement;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const SocialInputField: React.FC<SocialInputFieldProps> = ({
  label,
  iconUrl,
  iconComponent,
  inputProps,
}) => {
  return (
    <div className="flex flex-col space-y-2 flex-1">
      <Label htmlFor={inputProps?.id || ""}>{label}</Label>
      <div className="flex items-center bg-background rounded-xl border">
        <div className="flex items-center p-3 rounded-bl-xl rounded-tl-xl bg-[#f3f3f3] dark:bg-[#212736] justify-center">
          {iconComponent ? (
            iconComponent
          ) : (
            <img
              src={`https://cdn.simpleicons.org/${iconUrl}`}
              alt={`${label} icon`}
              className="w-5 h-5"
            />
          )}
        </div>
        <Input className="border-none shadow-none" {...inputProps} />
      </div>
    </div>
  );
};

export default SocialInputField;
