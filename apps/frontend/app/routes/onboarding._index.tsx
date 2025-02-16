import { observer } from 'mobx-react-lite';

import { Onboarding } from '~/features/onboarding/onboarding.component';
import globalStore, { GlobalStoreContext } from '~/stores/root.provider';

const OnboardingIndex = observer(function OnboardingIndex() {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      <Onboarding />
    </GlobalStoreContext.Provider>
  );
});

OnboardingIndex.displayName = 'OnboardingIndex';

export default OnboardingIndex;
