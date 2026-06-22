import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// A password field with a show/hide toggle. "Revealing" a password is just
// flipping the input's `type` between 'password' (masked) and 'text' (visible).
// In DaisyUI 5 the `input` class lives on this wrapping <label>, so the eye
// button sits inside the field's border alongside the text.
const PasswordInput = ({ value, onChange, autoComplete, placeholder }) => {
  const [show, setShow] = useState(false);

  return (
    <label className="input input-bordered flex w-full items-center gap-2">
      <input
        type={show ? 'text' : 'password'}
        name="password"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        // grow fills the wrapper; the bracket utilities hide the browser's
        // own native reveal icon so only our custom eye shows.
        className="grow [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </label>
  );
};

export default PasswordInput;
