"use client";

import React, { FC, useState } from "react";

interface DropAreaProps {
    onDrop : (
     title? : string,
     index? : number,
    ) => void; 
}

const DropArea:FC<DropAreaProps> = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className={`${
        showDrop ? "opacity-100 h-16 " : "opacity-0 h-1.5"
      } border border-gray-500 border-dashed rounded-xl flex justify-center items-center transition-all  ease-in-out `}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setTimeout(() => setShowDrop(false), 500) }
      onDragOver={(e) => e.preventDefault()}      
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
    >
      <h1 className="text-gray-500 font-light text-sm">Drop Here</h1>
    </div>
  );
};

export default DropArea;
