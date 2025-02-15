import { observer } from 'mobx-react-lite';

import type { OnboardingStore } from './stores/onboardingStore';

export const StepProgression = observer(({ store }: { store: OnboardingStore }) => {
  const { navigationStore } = store;

  return (
    <div className="mb-8">
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${navigationStore.progress}%` }}
        />
      </div>

      <div className="text-sm text-gray-600">
        Étape {navigationStore.currentStepInfo.current} sur {navigationStore.currentStepInfo.total}
      </div>
    </div>
  );
});
