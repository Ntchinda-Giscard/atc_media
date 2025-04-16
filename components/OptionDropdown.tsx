import { IDropdownItems } from '@/constant/interphase'
import React, { useEffect, useRef, useState } from 'react'

interface OptionDropdownProps {
  options: IDropdownItems[]
}

function OptionDropdown({ options }: OptionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className='cursor-pointer rounded-full bg-[var(--white)] text-[var(--primary-color)] text-2xl w-[30px] h-[30px] col-center' onClick={() => setIsOpen(!isOpen)}>
        <div className="" >&#x22EE;</div>
      </div>
      {isOpen && (
        <div className="absolute right-0 w-auto mt-1 bg-[var(--white)] rounded-md shadow-lg z-1000">
          <ul className="py-1 text-sm">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  option.onClick && option.onClick()
                  setIsOpen(false)
                }}
                className='px-4 py-1 cursor-pointer'
              >
                <div className='flex items-center' onClick={() => option.onClick && option.onClick()}>
                  <div className='text-primary'>{option.icon}</div>
                  <div className="ml-3 cursor-pointer hover:text-primary">
                    {option.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OptionDropdown;