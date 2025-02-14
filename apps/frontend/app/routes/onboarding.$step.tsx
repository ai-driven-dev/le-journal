import type { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import {
  onboardingStore,
  type OnboardingStep,
} from '../features/onboarding/stores/onboardingNavigationStore';

import { StepForm } from '~/features/onboarding/components/StepForm';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<
  | {
      step: OnboardingStep;
    }
  | TypedResponse<never>
> => {
  const step = params.step as OnboardingStep;

  if (onboardingStore.isCompleted) {
    return redirect('/dashboard', 301);
  }

  if (!['welcome', 'permissions', 'setup', 'finish'].includes(step)) {
    throw new Response('Not Found', { status: 404 });
  }

  return { step };
};

const OnboardingStepPage = observer(() => {
  const { step } = useLoaderData<typeof loader>();

  return <StepForm currentStep={step} />;
});

export default OnboardingStepPage;
