import { observer } from 'mobx-react-lite';

export const StepSetup = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Configuration</h2>
      <p>Configurez vos préférences.</p>
    </div>
  );
});
