"use strict";

//DTO - regras do campo
exports.cpfDTO = {
  type: "string",
  pattern: "^\\d{11}$",
  example: "21554495008",
};
