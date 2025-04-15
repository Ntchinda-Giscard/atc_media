import React from 'react'
import { IDropdownItems } from '@/constant/interphase'

interface AppActionPops {
  actions: IDropdownItems[],
}

const AppActions = ({
  actions
}: AppActionPops) => {
  return (
    <div className='flex items-center justify-center'>
      {
        actions.map((action, index) =>
          <div key={action.name} className={`cursor-pointer font-normal text-[14px]  px-2 ${index == actions.length - 1 ? 'border-0' : 'border-1 border-r'}`}>
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