import chalk from 'chalk';
import gradient from 'gradient-string';

type MsgStatus = 'ok' | 'nok';

const customGradient = gradient('#0099F9', '#F11710');

export const helperText = `
  ${chalk.bold.underline('Usage:')}
  $ alm-invoices <command> [options...] 

  ${chalk.bold.underline('Available commands:')}
  generate   Generate an invoice. You will be asked for the parameters.
  list       List invoices.

  ${chalk.bold.underline('Available global options:')}
  --help, -h          Show this help message
  --version, -v       Show the version of this script
  `;

export const printTitle = (title: string) => {
  const separator = '-'.repeat(title.length + 2);
  console.log(
    chalk.bold(customGradient(`${separator}\n ${title} \n${separator}`))
  );
};

export const printMsg = (msg: string, tag?: string, tagColor?: MsgStatus) => {
  console.log(
    tag
      ? tagColor === 'ok'
        ? chalk.green(tag.toUpperCase()) + ' ' + msg
        : tagColor === 'nok'
        ? chalk.red(tag.toUpperCase()) + ' ' + msg
        : tag.toUpperCase() + ' ' + msg
      : msg
  );
};
