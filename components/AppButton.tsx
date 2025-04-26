import { ReactNode } from 'react';

interface AppButtonProps {
  icon?: ReactNode,
  text?: string,
  onClick: () => void,
  big?: boolean,
}

function AppButton({ icon, text, onClick, big }: AppButtonProps) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-2 py-2 font-medium text-[var(--white)] w-auto justify-center cursor-pointer bg-[var(--primary-color)] 
    ${big ? 'rounded-[12px] text-[20px] px-7': 'rounded-[4px] text-[12px] px-2'}
    `}>
      {icon && (icon)}
      {text && (text)}
    </button>
  );
}

export default AppButton;