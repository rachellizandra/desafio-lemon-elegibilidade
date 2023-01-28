"use strict";

//DTO - regras do campo
exports.cnpjDTO = {
  type: "string",
  pattern: "^\\d{14}$",
  example: "33400689000109",
};
