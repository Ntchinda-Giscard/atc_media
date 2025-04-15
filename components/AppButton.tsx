import { PlusCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface AppButtonProps {
  icon?: ReactNode,
  text?: string,
  onClick: () => void,
}

function AppButton({ icon, text, onClick }: AppButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-2 py-2 font-medium text-[var(--white)] w-auto justify-center text-[12px] bg-[var(--primary-color)] rounded-[4px] ">
      {icon && (icon)}
      {text && (text)}
    </button>
  );
}

export default AppButton;