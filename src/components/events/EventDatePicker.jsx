import { useEffect, useRef } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'cally'; // registers the <calendar-date> / <calendar-month> web components

// Turn the picker's "YYYY-MM-DD" value into a friendly label for the trigger.
// Parsed at local midnight so the shown day matches the picked day (no TZ drift).
const formatLabel = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// Date-only picker: Cally for the calendar UI, daisyUI's `cally` class for the
// styling, wrapped in a daisyUI dropdown so it pops open under the trigger.
// `value` is a "YYYY-MM-DD" string; `onChange` receives the same. `min`, when
// given, greys out (disables) any earlier day.
const EventDatePicker = ({ value, onChange, min }) => {
  const calendarRef = useRef(null);

  // Cally emits a native `change` event that React's onChange prop won't catch,
  // so we attach the listener by hand via a ref.
  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;

    const handleChange = (e) => {
      onChange(e.target.value);
      // Drop focus so the daisyUI dropdown closes after a day is picked.
      document.activeElement?.blur();
    };

    el.addEventListener('change', handleChange);
    return () => el.removeEventListener('change', handleChange);
  }, [onChange]);

  return (
    <div className="dropdown w-full">
      {/* Trigger: looks like a normal input, shows the chosen date or a hint. */}
      <div
        tabIndex={0}
        role="button"
        className="input input-bordered flex w-full items-center justify-between"
      >
        <span className={value ? '' : 'text-base-content/50'}>
          {value ? formatLabel(value) : 'Pick a date'}
        </span>
        <FiCalendar className="h-4 w-4 opacity-60" />
      </div>

      {/* Pop-over calendar. */}
      <div tabIndex={0} className="dropdown-content z-10 mt-1">
        <calendar-date
          ref={calendarRef}
          className="cally rounded-box border border-base-300 bg-base-100 shadow-lg"
          value={value}
          min={min}
        >
          <FiChevronLeft slot="previous" className="size-4" aria-label="Previous" />
          <FiChevronRight slot="next" className="size-4" aria-label="Next" />
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>
  );
};

export default EventDatePicker;
