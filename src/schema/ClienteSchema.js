"use strict";

const { classesDeConsumoEnum } = require("../enums/classesDeConsumoEnum");
const {
  modalidadesTarifariasEnum,
} = require("../enums/modalidadesTarifariasEnum");
const { tiposDeConexaoEnum } = require("../enums/tiposDeConexaoEnum");
const { cpfDTO } = require("../utils/cpfDTO");
const { cnpjDTO } = require("../utils/cnpjDTO");

const enumOf = (values) => ({
  type: typeof values[0],
  enum: values,
  example: values[0],
});

const input = {
  type: "object",
  additionalProperties: false,
  required: [
    "numeroDoDocumento",
    "tipoDeConexao",
    "classeDeConsumo",
    "modalidadeTarifaria",
    "historicoDeConsumo",
  ],
  properties: {
    numeroDoDocumento: { oneOf: [cpfDTO, cnpjDTO] },
    tipoDeConexao: tiposDeConexaoEnum,
    classeDeConsumo: classesDeConsumoEnum,
    modalidadeTarifaria: modalidadesTarifariasEnum,
    historicoDeConsumo: {
      type: "array",
      minItems: 3,
      maxItems: 12,
      items: {
        type: "integer",
        minimum: 0,
        maximum: 9999,
      },
    },
  },
};

const output = {
  oneOf: [
    {
      type: "object",
      additionalProperties: false,
      required: ["elegivel", "economiaAnualDeCO2"],
      properties: {
        elegivel: enumOf([true]),
        economiaAnualDeCO2: { type: "number", minimum: 0 },
      },
    },
    {
      type: "object",
      additionalProperties: false,
      required: ["elegivel", "razoesDeInelegibilidade"],
      properties: {
        elegivel: enumOf([false]),
        razoesDeInelegibilidade: {
          type: "array",
          uniqueItems: true,
          items: {
            type: "string",
            enum: [
              "Classe de consumo não aceita",
              "Modalidade tarifária não aceita",
              "Consumo muito baixo para tipo de conexão",
            ],
          },
        },
      },
    },
  ],
};

// console.debug(JSON.stringify(input));
// console.debug(JSON.stringify(output));

module.exports = {
  input,
  output,
};
