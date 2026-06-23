// Geocoding via OpenStreetMap's Nominatim — free and keyless. We use it to turn
// the typed venue/address into coordinates for the event map.
//
// Nominatim asks callers to keep volume low (≤1 request/second). We only call it
// on an explicit button press (never on every keystroke), so we stay well within
// that. Results aren't restricted to a country — events can be anywhere.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

// Look up an address string and return its coordinates, or null when nothing
// matched. Throws only when the service itself is unreachable.
export const geocodeAddress = async (query) => {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '1',
  });

  const res = await fetch(`${NOMINATIM_URL}?${params}`);
  if (!res.ok) {
    throw new Error('The map lookup service is unavailable right now.');
  }

  const results = await res.json();
  if (results.length === 0) return null;

  const { lat, lon, display_name } = results[0];
  return {
    latitude: Number(lat),
    longitude: Number(lon),
    displayName: display_name,
  };
};
