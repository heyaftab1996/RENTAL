// ImageGallery.js
import React from 'react';

const ImageGallery = ({ categories }) => {
  return (
    <div className="space-y-8 mt-12">
      {categories.map((category, index) => (
        <div key={index}>
          <h3 className="text-xl font-bold mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {category.images.map((src, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-lg transform transition-transform hover:scale-105"
              >
                <img src={`${src}`} alt={`${category.title} ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
