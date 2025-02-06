import { observer } from 'mobx-react-lite';

export const StepPermissions = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Permissions</h2>
      <p>Configuration des permissions nécessaires.</p>
    </div>
  );
});
