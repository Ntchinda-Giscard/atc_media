'use client';

export interface PageHeaderProps {
  title: string;
}

function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-3 font-bold text-[33px] text-[var(--title-color)]">{title}</div>
  )
}

export default PageHeader