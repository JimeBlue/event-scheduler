import { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { useEvents } from '../../context/EventsContext';
import { geocodeAddress } from '../../services/geocode';
import FieldError from '../ui/FieldError';
import FormError from '../ui/FormError';
import EventDatePicker from './EventDatePicker';


const initialFormData = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  latitude: '',
  longitude: '',
};

// Today as "YYYY-MM-DD" in the user's local timezone (en-CA formats this way).
// Used as the picker's minimum so past days are greyed out.
const today = new Date().toLocaleDateString('en-CA');

const CreateEventForm = () => {
  const { createEvent, closeCreateModal, showToast } = useEvents();


  const [formData, setFormData] = useState(initialFormData);

  // Two kinds of error, same split as the auth forms:
  // - `errors`: per-field, client-side checks (before we ever call the API).
  // - `error`:  a single message from the API/submit (e.g. server rejected it).
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Geocoding feedback: 'idle' | 'loading' | 'success' | 'error', plus a line
  // of text (the matched address on success, or an error message).
  const [geoStatus, setGeoStatus] = useState('idle');
  const [geoMessage, setGeoMessage] = useState('');

  // Validate the given data and return an errors object (empty = all good).
  // Required fields: title, description, date, time, location. Description is
  // required client-side by choice — the API allows it empty. Defaults to the
  // current formData so handleSubmit can call it with no args.
  const validate = (data = formData) => {
    const newErrors = {};

    // Title: required, and the API rejects fewer than 3 characters.
    if (!data.title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (data.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    // Description: required (our choice), and the API caps it at 255 chars —
    // over that it throws a misleading 500, so we catch it here first.
    if (!data.description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (data.description.trim().length > 255) {
      newErrors.description = 'Description must be 255 characters or less.';
    }

    if (!data.date) newErrors.date = 'Date is required.';
    if (!data.time) newErrors.time = 'Time is required.';
    if (!data.location.trim()) newErrors.location = 'Location is required.';

    // The API accepts past dates, but a scheduler shouldn't. Only meaningful
    // once both date and time are set (so we know the exact moment).
    if (data.date && data.time) {
      const when = new Date(`${data.date}T${data.time}`);
      if (when.getTime() < Date.now()) {
        newErrors.date = 'The event must be in the future.';
      }
    }

    // Coordinates are optional, but when filled the API enforces real-world
    // ranges (and throws a misleading 500 outside them), so we check here.
    if (data.latitude !== '') {
      const lat = Number(data.latitude);
      if (Number.isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = 'Latitude must be between -90 and 90.';
      }
    }
    if (data.longitude !== '') {
      const lng = Number(data.longitude);
      if (Number.isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = 'Longitude must be between -180 and 180.';
      }
    }

    return newErrors;
  };

  // Re-validate against the new data once errors are already showing, so a
  // corrected field clears its own error live (but we don't nag before the
  // first submit attempt). Shared by every field's change handler.
  const revalidate = (nextFormData) => {
    setErrors((prev) =>
      Object.keys(prev).length === 0 ? prev : validate(nextFormData)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    // Editing the address invalidates any previous lookup, so clear the
    // feedback until the user searches again.
    if (name === 'location') {
      setGeoStatus('idle');
      setGeoMessage('');
    }

    revalidate(nextFormData);
  };

  // The date picker isn't a native input, so it has its own change handler.
  const handleDateChange = (date) => {
    const nextFormData = { ...formData, date };
    setFormData(nextFormData);
    revalidate(nextFormData);
  };

  // Turn the typed address into coordinates and drop them into the lat/long
  // fields. The user can still tweak them by hand afterwards.
  const handleGeocode = async () => {
    const query = formData.location.trim();
    if (!query) return;

    setGeoStatus('loading');
    setGeoMessage('');

    try {
      const result = await geocodeAddress(query);
      if (!result) {
        // Wipe any coordinates from a previous search so we never submit
        // lat/long that don't match the current address.
        setFormData((prev) => ({ ...prev, latitude: '', longitude: '' }));
        setGeoStatus('error');
        setGeoMessage("We couldn't find that address. Try adding more detail.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        latitude: result.latitude,
        longitude: result.longitude,
      }));
      setGeoStatus('success');
      setGeoMessage(result.displayName);
    } catch (err) {
      setGeoStatus('error');
      setGeoMessage(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side checks first — if anything's missing, show it and bail before
    // bothering the API (this also guarantees date + time exist below).
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setError(null);
    setSubmitting(true);

    try {
      // The API wants one ISO date-time string. We hold the date ("YYYY-MM-DD")
      // and time ("HH:mm") in separate fields, so join them into a local
      // datetime and let toISOString() convert it to UTC.
      const localDateTime = `${formData.date}T${formData.time}`;

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: new Date(localDateTime).toISOString(),
        location: formData.location.trim(),
      };

      // latitude/longitude are optional — only send them when filled, and as
      // numbers, not the raw input strings.
      if (formData.latitude !== '') payload.latitude = Number(formData.latitude);
      if (formData.longitude !== '') payload.longitude = Number(formData.longitude);

      await createEvent(payload);

      // Reset, close, and confirm with a toast on success.
      setFormData(initialFormData);
      closeCreateModal();
      showToast('Your event was added successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2 className="font-heading text-2xl">Create New Event</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-text text-sm">Event Title*</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Tech Meetup: AI & the Future"
          />
          <FieldError message={errors.title} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-text text-sm">Description*</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-28 w-full"
            placeholder="Tell attendees what to expect and why they should come…"
          />
          {/* Live counter on the left, error (if any) keeps the row; the count
              turns red once it passes the 255-char API limit. */}
          <div className="flex items-start justify-between gap-2">
            <FieldError message={errors.description} />
            <span
              className={`ml-auto shrink-0 font-text text-xs ${
                formData.description.length > 255
                  ? 'text-error'
                  : 'text-base-content/60'
              }`}
            >
              {formData.description.length}/255
            </span>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-4">
          {/* Date isn't wrapped in a <label>: clicking a label would steal
              focus from the dropdown trigger. A plain span keeps the picker
              self-contained. */}
          <div className="flex flex-col gap-1">
            <span className="font-text text-sm">Date*</span>
            <EventDatePicker
              value={formData.date}
              onChange={handleDateChange}
              min={today}
            />
            <FieldError message={errors.date} />
          </div>

          <label className="flex flex-col gap-1">
            <span className="font-text text-sm">Time*</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <FieldError message={errors.time} />
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex flex-col gap-1">
            <span className="font-text text-sm">Location*</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Venue name, street & no., ZIP code, city"
            />
            <FieldError message={errors.location} />
          </label>

          {/* Geocode the address into coordinates for the map. */}
          <button
            type="button"
            onClick={handleGeocode}
            disabled={geoStatus === 'loading' || !formData.location.trim()}
            className="btn btn-sm btn-outline mt-1 w-fit gap-2"
          >
            <FiMapPin className="h-4 w-4" />
            {geoStatus === 'loading' ? 'Searching…' : 'Find coordinates'}
          </button>

          {geoStatus === 'success' && (
            <p className="font-text text-sm text-success">
              Found: {geoMessage}
            </p>
          )}
          {geoStatus === 'error' && (
            <p className="font-text text-sm text-error">{geoMessage}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-text text-sm">Latitude</span>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="52.5200"
            />
            <FieldError message={errors.latitude} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-text text-sm">Longitude</span>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="13.4050"
            />
            <FieldError message={errors.longitude} />
          </label>

          <p className="col-span-2 font-text text-xs text-base-content/60">
            Filled automatically with “Find coordinates”, or enter them manually.
          </p>
        </div>

        {/* API/submit-level error (e.g. network down, server rejects). */}
        <FormError message={error} />

        <div className="modal-action">
          <button
            type="button"
            onClick={closeCreateModal}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn border-brand-blue-dark bg-brand-blue-dark text-white hover:border-brand-blue hover:bg-brand-blue"
          >
            {submitting ? 'Creating…' : 'Create Event'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateEventForm;
