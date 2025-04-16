import { Search } from 'lucide-react'
import React from 'react'

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({
  placeholder
}: SearchBarProps) {
  return (
    <div className="flex items-center w-full max-w-md px-2 py-1 h-[38px] border border-[var(--primary-color)] rounded-[10px]" >
      <Search size={24} className=" mr-2 text-[var(--primary-color)]" />
      <input
        placeholder={placeholder}
        type="text"
        className="w-full placeholder-gray-500 outline-none text-[14px]"
      />
    </div>
  )
}

export default SearchBar