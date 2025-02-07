'use client';
import { AlertTriangle, ExternalLink, Eye, Link2OffIcon as LinkOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
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

const newsletters = [
  {
    id: 1,
    title: 'Newsletter 1',
    date: '2024-02-15',
    subject: 'Subject 1',
    status: 'completed',
    articles: [
      {
        subject: 'Article 1',
        description: 'Description 1',
        score: 85,
        link: 'https://www.example.com/article1',
      },
      {
        subject: 'Article 2',
        description: 'Description 2',
        score: 92,
        link: 'https://www.example.com/article2',
      },
    ],
  },
  {
    id: 2,
    title: 'Newsletter 2',
    date: '2024-02-12',
    subject: 'Subject 2',
    status: 'processing',
    articles: [
      {
        subject: 'Article 3',
        description: 'Description 3',
        score: 78,
        link: null,
      },
    ],
  },
  {
    id: 3,
    title: 'Newsletter 3',
    date: '2024-02-08',
    subject: 'Subject 3',
    status: 'failed',
    articles: [
      {
        subject: 'Article 4',
        description: 'Description 4',
        score: 65,
        link: 'https://www.example.com/article4',
      },
    ],
  },
];

function ScoreChip({ score }: { score: number }) {
  const color = score > 80 ? 'green' : score > 60 ? 'yellow' : 'red';
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {score}
    </span>
  );
}

export function NewsletterTable() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Week 7 - February 8 to 15</h2>
      <Accordion type="single" collapsible className="w-full">
        {newsletters.map((newsletter) => (
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
}

function NewsletterHeader({ newsletter }: { newsletter: (typeof newsletters)[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">{newsletter.title}</h3>
        <span className="text-sm text-gray-500">{newsletter.date}</span>
        <span className="text-sm">{newsletter.subject}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenDrawer}
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
        {newsletter.status === 'processing' && (
          <div className="flex items-center text-blue-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing
          </div>
        )}
        {newsletter.status === 'failed' && (
          <div className="flex items-center text-red-600">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Failed
          </div>
        )}
      </div>
    </div>
  );
}
