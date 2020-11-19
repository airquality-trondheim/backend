import { Area } from "../models/area.model";

let Validator = require('validatorjs');

export const validator = (body: any, rules: any, customMessages: any, callback: (a: any, b: boolean) => any) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false))
};

Validator.registerAsync('validArea', async function(value: any, attribute: any, req: any, passes: any) {
  const myarea = await Area.findOne({ name: value });
  if (myarea) passes();
  passes(false, "Area does not exist!");
});