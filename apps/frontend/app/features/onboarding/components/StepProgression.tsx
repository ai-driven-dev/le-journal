import { observer } from 'mobx-react-lite';

import { onboardingStore } from '../stores/onboardingStore';

export const StepProgression = observer(() => {
  return (
    <div className="mb-8">
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${onboardingStore.progress}%` }}
        />
      </div>

      <div className="text-sm text-gray-600">
        Étape {onboardingStore.currentStepInfo.current} sur {onboardingStore.currentStepInfo.total}
      </div>
    </div>
  );
});
