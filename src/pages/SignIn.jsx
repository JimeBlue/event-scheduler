import { Link } from 'react-router';
import SignInForm from '../components/auth/SignInForm';

// Thin page shell: heading + the form + the link to sign up.
// All the form logic lives in <SignInForm />.
const SignIn = () => {
  return (
    <div className='bg-brand-blue-dark py-12 sm:py-24 px-6 sm:px-12 lg:px-0'>
      <div className="container max-w-2xl py-12 bg-base-100 rounded-lg">
        <h1 className="font-heading text-5xl font-medium">Sign In</h1>
        <p className="mt-4 font-text text-base-content">
          Welcome back — sign in to create events.
        </p>
        <SignInForm />
        <p className="mt-6 font-text text-base">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="link text-brand-blue-dark hover:opacity-70">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
