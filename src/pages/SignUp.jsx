import { Link } from 'react-router';
import SignUpForm from '../components/auth/SignUpForm';

// Thin page shell: heading + the form + the link to sign in.
// All the form logic lives in <SignUpForm />.
const SignUp = () => {
  return (
    <div className="container max-w-md py-12">
      <h1 className="font-heading text-4xl">Sign Up</h1>
      <p className="mt-2 font-text text-base-content/70">
        Create an account to start scheduling events.
      </p>

      <SignUpForm />

      <p className="mt-6 font-text text-sm">
        Already have an account?{' '}
        <Link to="/login" className="link text-brand-blue">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
