import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validators';
import FieldError from '../ui/FieldError';

// One starting shape for the form, defined once. Reused to reset the form
// and as the single object that holds every field's value.
const initialFormData = { email: '', password: '' };

const SignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState(initialFormData);

  // Two distinct kinds of error:
  // - `errors`: per-field, client-side checks (before we ever call the API).
  // - `error`:  a single message from the API (e.g. "Invalid email or password.").
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
    if (!data.password) {
      newErrors.password = 'Password is required.';
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
      // login() hits POST /auth/login, stores the token, and flips
      // isAuthenticated to true. If it throws, we never navigate.
      await login(formData.email, formData.password);
      // FR015: on success, send the user Home.
      navigate('/');
    } catch (err) {
      // api.js gave us a readable message (e.g. "Invalid email or password.").
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-text text-sm">Email</span>
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
        <span className="font-text text-sm">Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="input input-bordered w-full"
          placeholder="••••••••"
        />
        <FieldError message={errors.password} />
      </label>

      {/* FR019: the API-level error (wrong credentials, network down, etc.). */}
      {error && (
        <div role="alert" className="alert alert-error">
          <span className="font-text">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary mt-2"
      >
        {submitting ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
