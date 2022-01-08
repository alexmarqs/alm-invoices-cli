import puppeteer from 'puppeteer';
import { INVOICE_URL, USER_INVOICE, PWD_INVOICE } from '../config';
import { chromiumExecutablePath } from './puppeteer-utils';

export const listInvoices = async () => {
  const { page, browser } = await initInvoicesWebAppBrowser();

  // using eval to workaround Error: Passed function is not well-serializable
  const invoicesData: string[][] = await page.evaluate(
    eval(`
    () => {
      const rows = document.querySelectorAll('#documents-listing tr');
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, (column) => column.innerText);
      });
    }`)
  );

  await browser.close();

  return invoicesData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateInvoice = async (date: string, quantity: number) => {
  throw new Error('Not implemented yet');
};

const initInvoicesWebAppBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromiumExecutablePath
  });
  const page = await browser.newPage();

  await page.goto(INVOICE_URL);

  await page.type('.login-form input[name="email"]', USER_INVOICE);
  await page.type('.login-form input[name="password"]', PWD_INVOICE);
  await page.click('.login-form input[name="commit"]');
  await page.waitForSelector('.navMenu');

  const navElements = await page.$$('.navMenu li a');
  await navElements[1].click();
  await page.waitForNavigation();

  return { page, browser };
};
