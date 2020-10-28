const Validator = require('validator');

export const validator = (body: any, rules: any, customMessages: any, callback: (a: any, b: boolean) => any) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false))
};
