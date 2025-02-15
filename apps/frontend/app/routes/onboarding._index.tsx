import { observer } from 'mobx-react-lite';

import { Onboarding } from '~/features/onboarding/onboarding.component';

const OnboardingIndex = observer(function OnboardingIndex() {
  return <Onboarding currentStep="welcome" />;
});

OnboardingIndex.displayName = 'OnboardingIndex';

export default OnboardingIndex;
