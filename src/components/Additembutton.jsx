import React from 'react';
import { PlusCircle } from 'lucide-react';

const AddItemButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-700 via-violet-800 to-black text-white font-semibold shadow-lg hover:shadow-purple-600 transition duration-300 hover:scale-105"
    >
      <PlusCircle className="w-5 h-5" />
      Add Item
    </button>
  );
};

export default AddItemButton;
