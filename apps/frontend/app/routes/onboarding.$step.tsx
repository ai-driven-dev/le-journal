import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { observer } from 'mobx-react-lite';

import type { OnboardingStep } from '../features/onboarding/stores/onboardingStore';

import { StepForm } from '~/features/onboarding/components/StepForm';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<{
  step: OnboardingStep;
}> => {
  const step = params.step as OnboardingStep;

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
