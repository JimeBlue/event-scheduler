// Renders the red helper text under a form field. If there's no message it
// renders nothing (returns null), so call sites don't need their own && guard.
// Shared across every form (auth forms, the event form, etc.).
const FieldError = ({ message }) => {
  if (!message) return null;
  return <p className="mt-1 font-text text-sm text-error">{message}</p>;
};

export default FieldError;
