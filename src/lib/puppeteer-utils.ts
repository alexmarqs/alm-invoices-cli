/* eslint-disable @typescript-eslint/no-explicit-any */
import puppeteer from 'puppeteer';
import path from 'path';

const isPkg = typeof process.pkg !== 'undefined';

const chromiumExecutablePath = isPkg
  ? (puppeteer as any as puppeteer.PuppeteerNode)
      .executablePath()
      .replace(
        process.platform === 'win32'
          ? /^.*?\\node_modules\\puppeteer\\\.local-chromium/
          : /^.*?\/node_modules\/puppeteer\/\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      )
  : (puppeteer as any as puppeteer.PuppeteerNode).executablePath();

export { chromiumExecutablePath };
