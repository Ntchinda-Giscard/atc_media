import { Search } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

interface SearchBarProps {
  placeholder?: string;
  searchQuery?: string;
  onChangeSearch?: Dispatch<SetStateAction<string>>;
}

function SearchBar({
  placeholder,
  onChangeSearch,
  searchQuery
}: SearchBarProps) {
  return (
    <div className="flex items-center w-full max-w-md px-2 py-1 h-[38px] border border-[var(--primary-color)] rounded-[10px]" >
      <Search size={24} className=" mr-2 text-[var(--primary-color)]" />
      <input
        placeholder={placeholder}
        type="text"
        value={searchQuery}
        onChange={(e) => onChangeSearch && onChangeSearch(e.target.value)}
        className="w-full placeholder-gray-500 outline-none text-[14px]"
      />
    </div>
  )
}

export default SearchBar