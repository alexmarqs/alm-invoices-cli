const USER_INVOICE = process.env.INVOICE_USR || '';
const PWD_INVOICE = process.env.INVOICE_PWD || '';
const INVOICE_URL = process.env.INVOICE_URL || '';

const isValid = () => {
  return USER_INVOICE && PWD_INVOICE && INVOICE_URL ? true : false;
};

export { USER_INVOICE, PWD_INVOICE, INVOICE_URL, isValid };
