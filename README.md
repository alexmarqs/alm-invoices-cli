# ALM Invoices CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

My personal CLI (Command Line Interface) app to manage my invoices via Web Scraping.

> **_WIP (Work in Progress)_:** For now only the list command is fully implemented. The generate command will be finished in the next couple of weeks.

## Motivation

I'm using a SaaS (Software as a Service) to generate invoices in my own company however it doesn't provide/expose an API for developers like me that want to automate tedious tasks! Do I have a solution? Of course, as a developer nothing is impossible! Via Web Scrapping (with a headless browser to perform browser automation) I'm able to interact with the Web Application and perform all the operations.

## Technologies

- Typescript (selected ES2020 as target because I assume Node.js version 14 or higher is being used)
- Node.js
- [Puppeteer](https://github.com/puppeteer/puppeteer) (headless browser automation)
- ESLint + Prettier + Husky
- Yarn
- [Pkg](https://github.com/puppeteer/puppeteer) (create executable file)
- [Meow](https://github.com/sindresorhus/meow) (parse command line arguments + help functionalities) - I could use [Yargs](https://github.com/yargs/yargs), [OCLIF](https://github.com/oclif/oclif), [Commander.js](https://github.com/tj/commander.js/), or other CLI libraries for more complex CLI applications
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) (to ask questions to the user)

Btw, as I'm talking about CLI apps, there is another cool package that you can use to simplify shell commands executions if needed: [Sheeljs](https://github.com/shelljs/shelljs).

## How to execute the CLI

As I'm not distributing the CLI to the public / NPM registry, you can install it globally in your machine via Yarn or NPM:

```bash
  yarn global add .
  # OR
  npm install -g .
```

Let’s say I want to distribute this for only certain persons that don't have a proper Node environment in their machine. For that, I package my CLI as a single executable, using the `pkg` module from Vercel. The binary is available in the `bin/<os>` folder (also available in compressed format). For now, only macOS is supported.

**Requirements**: Set up the following environment variables (please check `.env.example`): `USER_INVOICE`, `INVOICE_URL` and `PWD_INVOICE` in your system.

## Resources

https://medium.com/geekculture/building-a-node-js-cli-with-typescript-packaged-and-distributed-via-homebrew-15ba2fadcb81

https://kirablog.hashnode.dev/build-a-cli-using-nodejs#heading-adding-logic

## License

MIT License © [alexmarqs](https://github.com/alexmarqs)
