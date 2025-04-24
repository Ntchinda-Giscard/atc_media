import React from 'react'

interface AppBadgeProps {
  error?: boolean,
  title: string;
}

function AppBadge({ title, error }: AppBadgeProps) {
  return (
    <div
      className={
        `rounded-full font-normal text-[13px] w-fit px-2 justify-center items-center flex
        ${error ? 'bg-[var(--fadded-red)] text-[var(--red)]' : 'bg-[var(--fadded-green)] text-[var(--green)] '}
        `}
    >
      <div className={
        `h-2 w-2 rounded-full mt-[1px] mr-[2px]
        ${error ? 'bg-[var(--red)] ' : 'bg-[var(--green)]'}
        `}></div>
      {title}
    </div>
  )
}

export default AppBadge