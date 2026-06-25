import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../services/api';


const EventsContext = createContext();


export const useEvents = () => useContext(EventsContext);

const EventsProvider = ({ children }) => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //"Highlights" events: upcoming events, fetched from /events/upcoming endpoint capped at 3 
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [upcomingError, setUpcomingError] = useState(null);

  // Create-event modal open/closed state, driven through named actions so any
  // component (the page button, the modal's own close control) toggles it the
  // same way without touching the setter directly.
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // A single transient toast: { message, type } or null. Reusable for any
  // action (create now, edit/delete later). It auto-dismisses; the timer ref
  // lets a new toast cancel the previous one's pending hide.
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const hideToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(null);
  };

  const showToast = (message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // Ask api.js for the list and store the result.
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      //  API wraps events in a paginated object; the array is in .results.
      // limit=100 so we get all of them, not just the default first 10.
      const data = await api.get('/events?limit=100');

      // FR011: unwrap + sort chronologically by the event date (earliest first).
      const sorted = [...data.results].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setEvents(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ask api.js for the upcoming events and keep only the first 3 for the Highlights section. 
  const fetchUpcoming = async () => {
    setUpcomingLoading(true);
    setUpcomingError(null);
    try {
      const data = await api.get('/events/upcoming');
      setUpcoming(data.slice(0, 3));
    } catch (err) {
      setUpcomingError(err.message);
    } finally {
      setUpcomingLoading(false);
    }
  };

  // Run both fetches once, right after the provider first mounts.
  useEffect(() => {
    fetchEvents();
    fetchUpcoming();
  }, []);

  // Create a new event (POST /events). api.js auto-attaches the auth token, and
  // the backend sets organizerId from it — so the caller never sends that.
  // After it succeeds we refetch so the new event shows up in the list.
  const createEvent = async (eventData) => {
    const created = await api.post('/events', eventData);
    await fetchEvents();
    return created;
  };

  // Get one event.
  const getEventById = async (id) => {
    //  If  list is already loaded, i.e. if the event I want is in memory, grabs it instantly, no request.
    const cached = events.find((event) => String(event.id) === String(id));
    if (cached) return cached;

    return api.get(`/events/${id}`);
  };


  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        upcoming,
        upcomingLoading,
        upcomingError,
        getEventById,
        createEvent,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
