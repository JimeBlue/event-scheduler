// Pure, reusable form-validation helpers. No React here — just functions that
// take a value and return a boolean, so any form can share the same rules.

// True if the string looks like an email: something@something.something.
export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
