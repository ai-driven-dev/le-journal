'use client';

import { ExternalLink, Eye, Link2OffIcon as LinkOff } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';

import { dashboardStore } from '../../global/dashboard.store';

import type { INewsletter } from './newsletter-table.type';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

const ScoreChip: FC<{ score: number }> = ({ score }) => {
  const color = score > 80 ? 'green' : score > 60 ? 'yellow' : 'red';
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {score}
    </span>
  );
};

const NewsletterHeader: FC<{ newsletter: INewsletter }> = observer(({ newsletter }) => {
  const store = dashboardStore.newsletterTable;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">{newsletter.title}</h3>
        <span className="text-sm text-gray-500">{newsletter.date}</span>
        <span className="text-sm">{newsletter.subject}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Drawer open={store.isDrawerOpen} onOpenChange={store.setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={store.handleOpenDrawer}
              className="px-4 py-2 transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Newsletter
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {newsletter.title} - {newsletter.subject}
              </DrawerTitle>
              <DrawerDescription>{newsletter.date}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="mt-2 border-t pt-4">
                <h4 className="font-semibold mb-2">Newsletter Content</h4>
                <p className="text-sm text-gray-500">
                  {/* This is where you'd render the actual newsletter content */}
                  Newsletter content goes here...
                </p>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
});

export const NewsletterTable: FC = observer(() => {
  const store = dashboardStore.newsletterTable;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Week 7 - February 8 to 15</h2>
      <Accordion type="single" collapsible className="w-full">
        {store.newsletters.map((newsletter) => (
          <AccordionItem key={newsletter.id} value={newsletter.id.toString()}>
            {newsletter.status === 'completed' ? (
              <AccordionTrigger>
                <div className="w-full cursor-pointer hover:bg-gray-50">
                  <NewsletterHeader newsletter={newsletter} />
                </div>
              </AccordionTrigger>
            ) : (
              <div className="py-4">
                <NewsletterHeader newsletter={newsletter} />
              </div>
            )}
            {newsletter.status === 'completed' && (
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsletter.articles.map((article, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {article.link ? (
                            <a
                              href={article.link}
                              className="flex items-center text-blue-600 hover:underline"
                            >
                              {article.subject}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          ) : (
                            <span className="flex items-center text-gray-400">
                              {article.subject}
                              <LinkOff className="ml-1 h-3 w-3" />
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{article.description}</TableCell>
                        <TableCell className="text-right">
                          <ScoreChip score={article.score} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
});
