import { useEffect, useState } from "react";
import { Input, InputProps } from "./ui/input";
interface InputMoneyProps extends InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addonBefore?: string;
}
const DECIMAL_SIZE = 2;
const InputMoney = ({ value, onChange, ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);
  useEffect(() => {
    const valueString = `${value}`;
    if (!/\D/.test(valueString.replace(".", ""))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace(".", ","));
    }
  }, [value]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueRemoved = event.target.value.replace(",", "");
    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = [
      valueRemoved.slice(0, sizeSlice),
      ".",
      valueRemoved.slice(sizeSlice),
    ].join("");
    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };
  return (
    <div className="flex items-center bg-background rounded-xl border">
      <div className=" flex  items-center p-3 rounded-bl-xl rounded-tl-xl  bg-[#f3f3f3] dark:bg-[#212736] justify-center ">
        <span className="text-xs font-medium  ">R$</span>
      </div>
      <Input value={currentValue} onChange={handleOnChange} {...props} />
    </div>
  );
};
export default InputMoney;
