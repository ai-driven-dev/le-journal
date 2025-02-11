import { observer } from 'mobx-react-lite';

import { GoogleSignIn } from '../components/google-sign-in.component';

export const LoginPage = observer((): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
});
