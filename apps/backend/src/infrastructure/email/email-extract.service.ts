import { readFileSync } from 'fs';

import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { simpleParser } from 'mailparser';

@Injectable()
export class EmailExtractService {
  async extractHtmlFromFile(filePath: string): Promise<string | false> {
    try {
      const data = readFileSync(filePath);
      return this.extractHtml(data.toString());
    } catch (error: unknown) {
      console.error('Erreur lors de la lecture du fichier:', error);
      return false;
    }
  }

  async extractHtml(emailContent: string): Promise<string | false> {
    try {
      const parsed = await simpleParser(emailContent);

      if (parsed.html === false) return false;

      const $ = cheerio.load(parsed.html);

      $('style, meta, link, script, noscript, head, iframe, embed').remove();
      $('style[type="text/css"]').remove();
      $('[style]').removeAttr('style');
      $('img').removeAttr('src');
      $('br').remove();

      const cleanedHtml = $.html().replace(/&nbsp;/g, ' ');

      return cleanedHtml;
    } catch (error: unknown) {
      console.error("Erreur lors de l'extraction du HTML:", error);
      return false;
    }
  }
}
