import React from 'react';
import { Trash2 } from 'lucide-react';

const RemoveItemButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-700 via-rose-900 to-black text-white font-semibold shadow-md hover:shadow-red-600 transition duration-300 hover:scale-105"
    >
      <Trash2 className="w-5 h-5" />
      Remove Item
    </button>
  );
};

export default RemoveItemButton;
