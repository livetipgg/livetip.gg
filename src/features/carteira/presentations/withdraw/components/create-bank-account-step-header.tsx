/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import React from "react";

export const CreateBankAccountStepHeader = ({ steps }: any) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center gap-4 ">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="w-full max-w-[200px]">
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center border p-2 rounded-full gap-2 px-4",
                  {
                    "border-primary ": step.status === "active",
                    "border-success": step.status === "done",
                  }
                )}
              >
                {/* Ícone dinâmico */}
                {step.status === "done" ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  React.createElement(step.icon, {
                    size: 18,
                    className: `${
                      step.status === "active"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`,
                  })
                )}

                <div
                  className={`text-sm font-medium ${
                    step.status === "active"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                  ${step.status === "done" ? "text-success" : ""}
                  `}
                >
                  {step.name}
                </div>
              </div>

              {stepIdx !== steps.length - 1 && (
                <div
                  className={`ml-2 hidden h-[1px] flex-1  sm:block ${
                    step.status === "done"
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
