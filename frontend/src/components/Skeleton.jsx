import React from 'react';

const Skeleton = ({ MOVIES_PER_PAGE }) => {
  return Array.from({ length: MOVIES_PER_PAGE }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col gap-3 animate-pulse
                 w-[45%] sm:w-[150px] md:w-[180px] lg:w-[180px]"
    >
      {/* Poster skeleton - Glass Effect */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl
                      h-48 sm:h-60 md:h-72 lg:h-72 w-full"></div>

      {/* Text Container - Slightly more subtle glass */}
      <div className="flex flex-col gap-2 px-1">
        {/* Title skeleton */}
        <div className="bg-white/20 backdrop-blur-sm rounded-md h-4 w-full"></div>

        {/* Info skeleton (release date + rating) */}
        <div className="flex justify-between w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-md w-12 h-3"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-md w-8 h-3"></div>
        </div>
      </div>
    </div>
  ));
};

export default Skeleton;