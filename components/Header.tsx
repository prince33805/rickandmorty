import React from 'react';

interface HeaderProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="max-w-[1400px] mx-auto flex justify-between items-center px-12 py-8 bg-transparent">
      <div className="flex justify-center items-center font-[600] text-[40px] text-[#363545]">
        Characters of Rick & Morty!
      </div>

      <div className="flex items-center space-x-6 mx-4">
        <label className="flex items-center space-x-3 font-[400] text-[24px]">
          <input
            type="radio"
            name="sort"
            value="name"
            checked={sortBy === 'name'}
            onChange={() => onSortChange('name')}
            className="radio-input"
          />
          <span>Sort Name</span>
        </label>
        <label className="flex items-center space-x-3 font-[400] text-[24px]">
          <input
            type="radio"
            name="sort"
            value="id"
            checked={sortBy === 'id'}
            onChange={() => onSortChange('id')}
            className="radio-input"
          />
          <span>Sort ID</span>
        </label>
      </div>
    </div>
  );
};

export default Header;
