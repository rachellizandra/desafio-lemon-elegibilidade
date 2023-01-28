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

  it("Deve verificar se o CPF for válido", () => {
    const cpf = "14254778596";

    expect(validarNumeroDocumento(cpf)).toBeUndefined();
  });

  it("Deve verificar se o CNPJ for válido", () => {
    const cnpj = "12546398754265";

    expect(validarNumeroDocumento(cnpj)).toBeUndefined();
  });
  it("Deveria retornar um tipo de conexão não suportado", () => {
    const tipoDeConexao = "tetrafasico";
    const razoesInelegibilidade = [];

    validarTipoDeConexao(tipoDeConexao, razoesInelegibilidade);

    expect(razoesInelegibilidade).toStrictEqual([
      "Tipo de conexão não suportado",
    ]);
  });

  it("Deveria retornar classe de consumo não aceita", () => {
    const classeConsumo = "embaixada";
    const razoesInelegibilidade = [];

    validarClasseConsumo(classeConsumo, razoesInelegibilidade);

    expect(razoesInelegibilidade).toStrictEqual([
      "Classe de consumo não aceita",
    ]);
  });

  it("Deveria retornar uma modalidade tarifária não aceita", () => {
    const modalidadeTarifaria = "amarela";
    const razoesInelegibilidade = [];

    validarModalidadeTarifaria(modalidadeTarifaria, razoesInelegibilidade);
    expect(razoesInelegibilidade).toStrictEqual([
      "Modalidade tarifária não aceita",
    ]);
  });

  it("Deveria retornar um tipo de conexão não suportado", () => {
    const historicoDeConsumo = 400;
    const tipoDeConexao = "tetrafasico";
    const razoesInelegibilidade = [];

    validarHistoricoConsumo({
      historicoDeConsumo,
      razoesInelegibilidade,
      tipoDeConexao,
    });

    expect(razoesInelegibilidade).toStrictEqual([
      "Tipo de conexão não suportado",
    ]);
  });

  it("Deveria retornar um histórico de consumo abaixo da média", () => {
    const mediaDeConsumo = 350;
    const tipoDeConexao = "monofasico";
    const razoesInelegibilidade = [];

    validarHistoricoConsumo({
      mediaDeConsumo,
      razoesInelegibilidade,
      tipoDeConexao,
    });

    expect(razoesInelegibilidade).toStrictEqual([
      "Consumo muito baixo para tipo de conexão",
    ]);
  });
});
