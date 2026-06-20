import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';


const EventsContext = createContext();


export const useEvents = () => useContext(EventsContext);

const EventsProvider = ({ children }) => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Run fetchEvents once, right after the provider first mounts.
  useEffect(() => {
    fetchEvents();
  }, []);

  // Get one event.
  const getEventById = async (id) => {
    //  If  list is already loaded, i.e. if the event I want is in memory, grabs it instantly, no request.
    const cached = events.find((event) => String(event.id) === String(id));
    if (cached) return cached;

    return api.get(`/events/${id}`);
  };


  return (
    <EventsContext.Provider
      value={{ events, loading, error, fetchEvents, getEventById }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
