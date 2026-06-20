// Turn an ISO date string into a human-friendly label with a bullet between
// the date and time, e.g. "Wed, 17 Jun 2026 • 14:19".
// Shared by EventCard and EventDetails.
export const formatDate = (date) => {
  const d = new Date(date);

  const datePart = d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const timePart = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${datePart} • ${timePart}`;
};
