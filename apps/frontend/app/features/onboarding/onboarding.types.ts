export const ONBOARDING_STEPS: OnboardingStep[] = [
  'welcome',
  'permissions',
  'readonly',
  'finished',
] as const;

export type OnboardingStep = 'welcome' | 'permissions' | 'readonly' | 'finished';
