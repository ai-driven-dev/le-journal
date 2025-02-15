import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { type OnboardingStep } from '../features/onboarding/stores/onboardingNavigationStore';

import { Onboarding } from '~/features/onboarding/onboarding.component';
import globalStore, { GlobalStoreContext } from '~/stores/root.provider';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<
  | {
      step: OnboardingStep;
    }
  | TypedResponse<never>
> => {
  const step = params.step as OnboardingStep;

  if (!['welcome', 'permissions', 'setup', 'finish'].includes(step)) {
    throw new Response('Not Found', { status: 404 });
  }

  return { step };
};

const OnboardingStepPage = observer(() => {
  const { step } = useLoaderData<typeof loader>();

  return (
    <GlobalStoreContext.Provider value={globalStore}>
      <Onboarding currentStep={step} />
    </GlobalStoreContext.Provider>
  );
});

OnboardingStepPage.displayName = 'OnboardingStepPage';

export default OnboardingStepPage;
