import { Copy } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { useDashboardStores } from '../../dashboard.context';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';

export const NewsletterAlias: FC = observer(() => {
  const { dashboardStore } = useDashboardStores();
  const store = dashboardStore.newsletterAlias;

  if (!store.currentProject) {
    return null;
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Votre Alias Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="truncate">{store.currentProject.newsletterAlias}</span>
              <Copy className="h-4 w-4 ml-2" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">À propos de votre alias</h4>
              <p className="text-sm">
                Ceci est votre alias unique pour la newsletter. Utilisez-le pour vous abonner aux
                newsletters sans révéler votre véritable adresse email.
              </p>
              <p className="text-sm">
                Contenu : Votre alias vous permet de recevoir du contenu personnalisé de différentes
                sources, adapté à vos centres d'intérêt. Il aide à gérer vos abonnements et à
                filtrer les emails indésirables.
              </p>
              <Button size="sm" onClick={store.copyToClipboard}>
                Copier dans le presse-papiers
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  );
});

NewsletterAlias.displayName = 'NewsletterAlias';
