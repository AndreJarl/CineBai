const DetailsSkeleton = () => {
  return (
    <div className="h-full w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center lg:flex-row flex-col gap-6 px-4 sm:px-8 mt-24 lg:mt-36 w-full max-w-5xl">

        {/* Poster */}
        <div className="h-[260px] w-[180px] sm:h-[320px] sm:w-[220px] lg:h-[400px] lg:w-[300px] rounded-lg bg-zinc-800 animate-pulse shrink-0" />

        {/* Info */}
        <div className="flex flex-col items-center lg:items-start justify-center gap-4 w-full max-w-xl">

          {/* Title */}
          <div className="h-7 sm:h-9 lg:h-10 w-3/4 rounded-lg bg-zinc-800 animate-pulse mx-auto lg:mx-0" />

          {/* Genres */}
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
            <div className="h-4 w-16 rounded-full bg-zinc-800 animate-pulse" />
            <div className="h-4 w-12 rounded-full bg-zinc-800 animate-pulse" />
            <div className="h-4 w-20 rounded-full bg-zinc-800 animate-pulse" />
          </div>

          {/* Overview lines */}
          <div className="flex flex-col gap-2 w-full items-center lg:items-start">
            <div className="h-3 w-full rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-[95%] rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-[88%] rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-[60%] rounded bg-zinc-800 animate-pulse" />
          </div>

          {/* Rating / runtime / year */}
          <div className="h-4 w-48 sm:w-56 rounded-full bg-zinc-800 animate-pulse mx-auto lg:mx-0" />

          {/* Add to list button */}
          <div className="h-10 w-32 sm:w-36 rounded-lg bg-zinc-800 animate-pulse mt-1 mx-auto lg:mx-0" />
        </div>
      </div>

      {/* Similar movies row */}
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-10 mt-10 lg:mt-14">
        <div className="h-5 w-40 rounded bg-zinc-800 animate-pulse mb-4 mx-auto lg:mx-0" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-40 sm:h-44 lg:h-52 w-full rounded-lg bg-zinc-800 animate-pulse ${i >= 2 ? 'hidden sm:block' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;