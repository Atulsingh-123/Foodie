import React from 'react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="hidden md:block w-full mt-10 md:w-1/4 lg:w-1/4 sm:w-1/4 fixed md:static top-16 left-0 h-full md:h-screen md:overflow-auto bg-gradient-to-b from-blue-500 to-blue-800 text-white shadow-lg p-4 sm:p-6">      <h2 className="text-2xl sm:text-lg md:text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-4 custom-scrollbar">
        {categories.map(category => (
          <li
            key={category}
            className={`cursor-pointer transition duration-300 ease-in-out transform border border-gray-300 p-2 rounded-lg hover:scale-105 ${category === selectedCategory ? 'text-black font-semibold bg-white ' : 'text-white'}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
