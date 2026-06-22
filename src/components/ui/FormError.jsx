import { LuBadgeAlert } from 'react-icons/lu';

// Renders the form-level alert: a single API/submit error (e.g. "User Already
// Exist", "incorrect email or password"). If there's no message it renders
// nothing, so call sites don't need their own && guard

const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="alert rounded-field border border-error/20 bg-error/10 text-error"
    >
      <LuBadgeAlert size={22} className="shrink-0" />
      <span className="font-text">{message}</span>
    </div>
  );
};

export default FormError;
