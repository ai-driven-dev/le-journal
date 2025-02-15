import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import { Onboarding } from '~/features/onboarding/onboarding.component';
import type { OnboardingStep } from '~/features/onboarding/onboarding.types';
import { ONBOARDING_STEPS } from '~/features/onboarding/onboarding.types';
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

  if (!ONBOARDING_STEPS.includes(step)) {
    return redirect('/onboarding/welcome');
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
