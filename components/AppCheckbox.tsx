import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CheckboxProps {
  check?: Dispatch<SetStateAction<boolean>>;
  isChecked?: boolean;
}

export default function AppCheckbox({
  check,
  isChecked
}: CheckboxProps) {

  return (
    <div className="rounded border-1">
      <label className="flex flex-row items-center w-full text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => check && check(!isChecked)}
          className="hidden"
        />
        <div
          className="rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center bg-[var(--white)] text-[var(--black)]"
        >
          {isChecked && <Check />}
        </div>
      </label>
    </div>
  );
};
