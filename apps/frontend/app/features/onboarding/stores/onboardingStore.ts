import { makeAutoObservable } from 'mobx';

export type OnboardingStep = '' | 'welcome' | 'permissions' | 'setup' | 'finish';

const ONBOARDING_STEPS: OnboardingStep[] = ['', 'permissions', 'setup', 'finish'] as const;

class OnboardingStore {
  private currentStep: OnboardingStep = '';
  private hasCompleted = false;

  constructor() {
    makeAutoObservable(this);
  }

  get step(): OnboardingStep {
    return this.currentStep;
  }

  get progress(): number {
    return ((ONBOARDING_STEPS.indexOf(this.currentStep) + 1) / ONBOARDING_STEPS.length) * 100;
  }

  get nextStep(): OnboardingStep | undefined {
    const currentIndex = ONBOARDING_STEPS.indexOf(this.currentStep);
    return ONBOARDING_STEPS[currentIndex === -1 ? 1 : currentIndex + 1];
  }

  get previousStep(): OnboardingStep | undefined {
    const currentIndex = ONBOARDING_STEPS.indexOf(this.currentStep);
    return currentIndex > 0 ? ONBOARDING_STEPS[currentIndex - 1] : undefined;
  }

  get canNavigateBack(): boolean {
    const isWelcomeStep = this.currentStep === 'welcome' || this.currentStep === '';
    const isLastStep = this.currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1];
    return !isWelcomeStep && !isLastStep;
  }

  get canNavigateForward(): boolean {
    return this.currentStep !== ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1];
  }

  get currentStepInfo(): { current: number; total: number } {
    const currentIndex = ONBOARDING_STEPS.indexOf(this.currentStep);
    return {
      current: currentIndex === -1 ? 1 : currentIndex + 1,
      total: ONBOARDING_STEPS.length,
    };
  }

  get isCompleted(): boolean {
    return this.hasCompleted;
  }

  getStepLabel(step: OnboardingStep | undefined): string {
    switch (step) {
      case '':
      case undefined:
      case 'welcome':
        return 'Bienvenue';
      case 'permissions':
        return 'Permissions';
      case 'setup':
        return 'Configuration';
      case 'finish':
        return 'Terminer';
      default:
        return '';
    }
  }

  completeOnboarding(): void {
    this.hasCompleted = true;
  }

  resetOnboarding(): void {
    this.currentStep = '';
    this.hasCompleted = false;
  }

  navigateToStep(step: OnboardingStep): void {
    this.currentStep = step;
  }
}

export const onboardingStore = new OnboardingStore();
