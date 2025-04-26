import { ReactNode } from 'react';

interface AppButtonProps {
  icon?: ReactNode,
  text?: string,
  onClick: () => void,
  big?: boolean,
  isLoading?: boolean,
}

function AppButton({ icon, text, onClick, big, isLoading }: AppButtonProps) {
  return (
    <button onClick={isLoading ? () => null : onClick} className={`flex items-center gap-2 px-2 py-2 font-medium text-[var(--white)] w-auto justify-center 
    ${big ? 'rounded-[12px] text-[20px] px-7' : 'rounded-[4px] text-[12px] px-2'}
    ${isLoading ? 'bg-gray-500 opacity-50 cursor-not-allowed' : ' cursor-pointer bg-[var(--primary-color)]'}
    `}
      disabled={isLoading}
    >
      {icon && (icon)}
      {text && (isLoading ? "Loading..." : text)}
    </button>
  );
}

export default AppButton;