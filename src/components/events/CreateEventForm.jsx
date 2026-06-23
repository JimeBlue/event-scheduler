import { useState } from 'react';
import { useEvents } from '../../context/EventsContext';
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

const CreateEventForm = () => {
  const { createEvent, closeCreateModal } = useEvents();


  const [formData, setFormData] = useState(initialFormData);

  // A single API/submit-level error (per-field validation comes next).
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // The API wants one ISO date-time string. We hold the date ("YYYY-MM-DD")
      // and time ("HH:mm") in separate fields, so join them into a local
      // datetime and let toISOString() convert it to UTC. Missing time falls
      // back to midnight so the date alone still produces a valid value.
      const localDateTime = `${formData.date}T${formData.time || '00:00'}`;

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

      // Reset and close on success.
      setFormData(initialFormData);
      closeCreateModal();
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
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-text text-sm">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-28 w-full"
            placeholder="Tell attendees what to expect and why they should come…"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          {/* Date isn't wrapped in a <label>: clicking a label would steal
              focus from the dropdown trigger. A plain span keeps the picker
              self-contained. */}
          <div className="flex flex-col gap-1">
            <span className="font-text text-sm">Date*</span>
            <EventDatePicker
              value={formData.date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, date }))
              }
            />
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
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="font-text text-sm">Location*</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Berlin Congress Center"
          />
        </label>

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
          </label>
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
