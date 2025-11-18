// SkeletonCard.jsx
import React from 'react';

const Skeleton = ({ MOVIES_PER_PAGE }) => {
  return Array.from({ length: MOVIES_PER_PAGE }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col gap-2 animate-pulse
                 w-[45%] sm:w-[150px] md:w-[180px] lg:w-[180px]"
    >
      {/* Poster skeleton */}
      <div className="bg-gray-700 rounded-lg
                      h-48 sm:h-60 md:h-72 lg:h-72 w-full"></div>

      {/* Title skeleton */}
      <div className="bg-gray-600 rounded h-4 w-full"></div>

      {/* Info skeleton (release date + rating) */}
      <div className="flex justify-between w-full">
        <div className="bg-gray-600 rounded w-10 h-4"></div>
        <div className="bg-gray-600 rounded w-10 h-4"></div>
      </div>
    </div>
  ));
};

export default Skeleton;
