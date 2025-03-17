import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useBlog } from '@/contexts/BlogContext';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const { setSearchTerm } = useBlog();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  // Update search term when debounced input changes
  useEffect(() => {
    setSearchTerm(debouncedInput);
  }, [debouncedInput, setSearchTerm]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-blog-light border border-blog-border rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blog-blue transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;