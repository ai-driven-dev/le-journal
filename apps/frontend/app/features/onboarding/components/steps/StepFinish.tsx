import { observer } from 'mobx-react-lite';

export const StepFinish = observer(() => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Terminé !</h2>
      <p>Votre journal est maintenant configuré.</p>
    </div>
  );
});
