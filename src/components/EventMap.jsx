import { MdOpenInNew } from 'react-icons/md';
import mapImage from '../assets/map.png';

// We don't trust the event's lat/long (some seed records have them swapped),
// so we skip coordinates entirely: the image is a generic decorative map, and
// the link searches Google Maps by the real address string instead.
const EventMap = ({ location }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;

  return (
    <div>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={mapImage}
          alt={`Map showing ${location}`}
          className="h-48 w-full rounded-xl object-cover"
        />
      </a>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-medium tracking-wide text-brand-blue-dark hover:text-brand-blue"
      >
        <MdOpenInNew className="size-5 shrink-0" />
        Open in Google Maps
      </a>
    </div>
  );
};

export default EventMap;
