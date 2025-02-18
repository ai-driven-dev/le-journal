import { observer } from 'mobx-react-lite';

import { Layout } from '~/components/Layout';
import { AuthProvider } from '~/features/auth/auth.context';
import { Onboarding } from '~/features/onboarding/onboarding.component';
import globalStore, { GlobalStoreContext } from '~/stores/root.provider';

const OnboardingIndex = observer(function OnboardingIndex() {
  return (
    <Layout>
      <GlobalStoreContext.Provider value={globalStore}>
        <AuthProvider>
          <Onboarding />
        </AuthProvider>
      </GlobalStoreContext.Provider>
    </Layout>
  );
});

OnboardingIndex.displayName = 'OnboardingIndex';

export default OnboardingIndex;
