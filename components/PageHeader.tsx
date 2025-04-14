'use client';

export interface PageHeaderProps {
  title: string;
}

function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="my-3 font-bold text-[33px]">{title}</div>
  )
}

export default PageHeader