"use strict";

const {
  validarNumeroDocumento,
  validarTipoDeConexao,
  validarClasseConsumo,
  validarModalidadeTarifaria,
  validarHistoricoConsumo,
} = require("../../utils/validador");

// Comando para rodar o teste -> npm run test:coverage
// A função tostrictEqual valida atributos, ex: json, arrays, objetos

describe("Validador", () => {
    it("Deveria lançar um Type error com um número de documento inválido", () => {
        const numeroDoDocumento = "362569";

        expect(() => validarNumeroDocumento(numeroDoDocumento)).toThrow();
    });
});