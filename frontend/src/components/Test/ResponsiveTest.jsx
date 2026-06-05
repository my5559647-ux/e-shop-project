import React from "react";

const ResponsiveTest = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Test</h1>
      
      {/* Mobile Header Test */}
      <div className="block 800px:hidden bg-blue-100 p-4 mb-4 rounded">
        <h2 className="text-lg font-semibold">Mobile Header Visible</h2>
        <p>This should only be visible on screens smaller than 800px</p>
      </div>
      
      {/* Desktop Header Test */}
      <div className="hidden 800px:block bg-green-100 p-4 mb-4 rounded">
        <h2 className="text-lg font-semibold">Desktop Header Visible</h2>
        <p>This should only be visible on screens 800px and larger</p>
      </div>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <div className="bg-red-100 p-4 rounded">Item 1</div>
        <div className="bg-yellow-100 p-4 rounded">Item 2</div>
        <div className="bg-purple-100 p-4 rounded">Item 3</div>
        <div className="bg-pink-100 p-4 rounded">Item 4</div>
      </div>
      
      {/* Responsive Text */}
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold">
          Responsive Text Size
        </h3>
        <p className="text-xs sm:text-sm lg:text-base">
          This text changes size based on screen width
        </p>
      </div>
    </div>
  );
};

export default ResponsiveTest;