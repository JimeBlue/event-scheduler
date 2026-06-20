// Placeholder shown while events load — mirrors EventCard's layout so the
// page doesn't jump when the real cards arrive (daisyUI skeleton).
const EventCardSkeleton = () => {
  return (
    <div className="card rounded-lg bg-base-100">
      <figure className="px-3 pt-3">
        {/* image */}
        <div className="skeleton h-48 w-full rounded-none"></div>
      </figure>

      <div className="card-body gap-4">
        {/* title */}
        <div className="skeleton h-6 w-3/4"></div>
        {/* date */}
        <div className="skeleton h-4 w-1/2"></div>
        {/* description (two lines) */}
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
        {/* location */}
        <div className="skeleton h-4 w-2/3"></div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
