import React from 'react'
import { IDropdownItems } from '@/constant/interphase'

interface AppActionPops {
  actions: IDropdownItems[],
  id?: number;
}

const AppActions = ({
  actions, id
}: AppActionPops) => {
  return (
    <div className='flex items-center justify-center'>
      {
        actions.map((action, index) =>
          <div key={index} className={`cursor-pointer font-normal text-[14px] text-[var(--action-text-color)]  px-2 
          ${index == actions.length - 1 ? 'border-0' : 'border-r border-[var(--action-text-color)]'}`}
            onClick={() => action.onClick && action.onClick(id)}>
            {action.icon}
            <span className='hidden md:inline'>
              {action.name}
            </span>
          </div>
        )
      }
    </div>
  )
}

export default AppActions