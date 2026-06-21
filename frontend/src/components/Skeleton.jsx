import React from 'react';

const Skeleton = ({ MOVIES_PER_PAGE }) => {
  return (
    <>
      <div className="flex flex-row gap-3 w-full col-span-full lg:hidden">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3 animate-pulse flex-1">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl h-[170px] sm:h-[220px] w-full" />
            <div className="flex flex-col gap-2 px-1">
              <div className="bg-white/20 backdrop-blur-sm rounded-md h-3 w-full" />
              <div className="flex justify-between w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-md w-12 h-2.5" />
                <div className="bg-white/10 backdrop-blur-sm rounded-md w-8 h-2.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex flex-row gap-3 w-full col-span-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3 animate-pulse flex-1">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl h-[300px] w-full" />
            <div className="flex flex-col gap-2 px-1">
              <div className="bg-white/20 backdrop-blur-sm rounded-md h-3 w-full" />
              <div className="flex justify-between w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-md w-12 h-2.5" />
                <div className="bg-white/10 backdrop-blur-sm rounded-md w-8 h-2.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Skeleton;