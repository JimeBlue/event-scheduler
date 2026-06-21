import { Link } from 'react-router';
import SignInForm from '../components/auth/SignInForm';

// Thin page shell: heading + the form + the link to sign up.
// All the form logic lives in <SignInForm />.
const SignIn = () => {
  return (
    <div className="container max-w-md py-12">
      <h1 className="font-heading text-4xl">Sign In</h1>
      <p className="mt-2 font-text text-base-content/70">
        Welcome back — sign in to create events.
      </p>

      <SignInForm />

      <p className="mt-6 font-text text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="link text-brand-blue">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
