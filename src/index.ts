#!/usr/bin/env node

import meow from 'meow';
import inquirer from 'inquirer';
import { printTitle, printMsg, helperText } from './lib/printer';
import { isValid as configIsValid } from './config';
import { listInvoices } from './lib/invoices';

enum COMMANDS {
  generate = 'generate',
  list = 'list'
}

const main = async () => {
  if (!configIsValid()) {
    printMsg('Invalid config environment', 'ERROR', 'nok');
    return;
  }

  const { input, flags, showHelp, showVersion } = meow(helperText, {
    flags: {
      help: { type: 'boolean', alias: 'h' },
      version: { type: 'boolean', alias: 'v' }
    }
  });

  if (flags.help) showHelp(0);
  if (flags.version) showVersion();

  switch (input[0]) {
    case COMMANDS.generate: {
      printTitle(`>> Let's invoice!`);
      const answers = await inquirer.prompt<{ date: string; quantity: number }>(
        [
          {
            type: 'input',
            name: 'date',
            message: 'What is the date of the invoice? (YYYY-MM-DD)',
            default: new Date().toISOString().split('T')[0],
            validate: (input: string) => {
              const regexDateFormat = /^\d{4}-\d{2}-\d{2}$/;
              if (
                !regexDateFormat.test(input) ||
                isNaN(new Date(input).getTime())
              ) {
                printMsg('Invalid date', '\nERROR', 'nok');
                return false;
              }
              return true;
            }
          },
          {
            type: 'input',
            name: 'quantity',
            message: 'What is the quantity (in days)',
            validate: (input: string) => {
              if (!input || isNaN(Number(input))) {
                printMsg('Invalid quantity', '\nERROR', 'nok');

                return false;
              }
              return true;
            }
          }
        ]
      );
      const { date, quantity } = answers;
      printMsg(
        `Generating your invoice (date: ${date}, quantity: ${quantity}), please wait...`,
        'Scrapping like a boss',
        'ok'
      );
      printMsg('Invoice to be generated!', 'WORK IN PROGRESS', 'ok');
      break;
    }

    case COMMANDS.list: {
      printTitle(`>> List your invoices!`);
      printMsg(
        'Getting your invoices, please wait...',
        'Scrapping like a boss',
        'ok'
      );
      const invoicesData = await listInvoices();
      if (invoicesData.length > 0) {
        printMsg(`Found ${invoicesData.length} invoices!`, 'DONE', 'ok');
        invoicesData.forEach((tableRow) => {
          if (tableRow[0]) {
            printMsg(
              `ID: ${
                isNaN(Number(tableRow[0].slice(-1))) // handle special case (remove last char if not a number)
                  ? tableRow[0].slice(0, -1)
                  : tableRow[0]
              } Date: ${tableRow[1]} Client: ${tableRow[2]}`
            );
          }
        });
      }
      break;
    }
    default:
      printMsg(`Please specify a valid command!`, `ERROR`, 'nok');
      showHelp(0);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
