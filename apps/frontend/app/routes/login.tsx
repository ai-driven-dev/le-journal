import { observer } from 'mobx-react-lite';

import { GoogleInSign } from '~/features/auth/auth-button.component';

const Login = observer(() => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">Connexion</h2>
        </div>
        <GoogleInSign />
      </div>
    </div>
  );
});

export default Login;
