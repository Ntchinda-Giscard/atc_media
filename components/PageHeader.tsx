'use client';

import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  iconClick?: () => void;
  icon?: ReactNode;
  secondaryIconClick?: () => void;
  secondaryIcon?: ReactNode;
}

function PageHeader({ title, iconClick, icon, secondaryIcon, secondaryIconClick }: PageHeaderProps) {
  return (
    <div className="mb-3 font-bold text-[33px] text-[var(--title-color)] flex items-center">
      {iconClick && icon &&
        <span className="cursor-pointer" onClick={iconClick}>
          {icon}
        </span>
      }
      {title}
      {secondaryIconClick && secondaryIcon &&
        <span className="ml-2 cursor-pointer" onClick={secondaryIconClick}>
          {secondaryIcon}
        </span>
      }
    </div>
  )
}

export default PageHeader