import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validators';
import FieldError from '../ui/FieldError';
import PasswordInput from '../ui/PasswordInput';

// One starting shape for the form, defined once. Reused to reset the form
// and as the single object that holds every field's value.
const initialFormData = { email: '', password: '' };

const SignUpForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // All field values live in one object — same pattern as SignInForm.
  const [formData, setFormData] = useState(initialFormData);

  // Two distinct kinds of error:
  // - `errors`: per-field, client-side checks (before we ever call the API).
  // - `error`:  a single message from the API (e.g. "User Already Exist").
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Validate the given data and return an errors object (empty = all good).
  // Defaults to current formData so handleSubmit can call it with no args.
  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    // The API rejects passwords shorter than 8 chars, so we check it here
    // first to give instant feedback instead of a round-trip.
    if (!data.password) {
      newErrors.password = 'Password is required.';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    return newErrors;
  };

  // One handler for every field: the input's `name` tells us which key to set.
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    // Re-validate against the new data so a corrected field clears its own
    // error live — but only once errors are already showing, so we don't nag
    // the user before they've tried to submit.
    setErrors((prev) => {
      if (Object.keys(prev).length === 0) return prev;
      return validate(nextFormData);
    });
  };

  const handleSubmit = async (e) => {
    // Stop the browser's default full-page reload on submit.
    e.preventDefault();

    // Client-side checks first — if anything's wrong, show it and bail
    // before bothering the API.
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setError(null);
    setSubmitting(true);

    try {
      // signup() hits POST /users and creates the account. The API returns
      // NO token, so this does NOT log the user in.
      await signup(formData.email, formData.password);
      // FR014: on success, send the user to Sign-In to actually log in.
      navigate('/login');
    } catch (err) {
      // api.js gave us a readable message (e.g. "User Already Exist").
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // noValidate turns OFF the browser's built-in validation so our own
    // checks (and messages) run instead.
    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-text text-sm">Email*</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="input input-bordered w-full"
          placeholder="you@example.com"
        />
        <FieldError message={errors.email} />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-text text-sm">Password*</span>
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
        <FieldError message={errors.password} />
      </label>

      {/* FR019: the API-level error (account already exists, network down, etc.). */}
      {error && (
        <div role="alert" className="alert alert-error rounded-field">
          <span className="font-text">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn mt-2 border-brand-blue-dark bg-brand-blue-dark text-white hover:bg-brand-blue"
      >
        {submitting ? 'Creating account…' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
