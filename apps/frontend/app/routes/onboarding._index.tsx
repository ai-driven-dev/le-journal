import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { observer } from 'mobx-react-lite';

export const loader: LoaderFunction = async () => {
  return redirect('/onboarding/welcome', 301);
};

const OnboardingIndex = observer(function OnboardingIndex() {
  return null;
});

OnboardingIndex.displayName = 'OnboardingIndex';

export default OnboardingIndex;
