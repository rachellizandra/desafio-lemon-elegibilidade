"use strict";

const { avaliarCliente } = require("../avaliarCliente");

//Comando para rodar o teste -> npm run test:coverage

describe("Avaliar cliente", () => {
  it("Deveria retornar um cliente elegível", () => {
    // cenário
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    };

    const expectedOutput = {
      //cenário
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    };

    const output = avaliarCliente(input); //comportamento

    expect(output).toStrictEqual(expectedOutput); //expectativa
  });


  it("Deveria retornar um cliente não elegível por consumo", () => {
    // cenário
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "comercial",
      modalidadeTarifaria: "convencional",
      historicoDeConsumo: [350, 350, 350, 350, 350],
    };

    const expectedOutput = {
      //cenário
      elegivel: false,
      razoesInelegibilidade: ["Consumo muito baixo para tipo de conexão"],
    };

    const output = avaliarCliente(input); //comportamento

    expect(output).toStrictEqual(expectedOutput); //expectativa
  });

  it("Deveria retornar um cliente não elegível", () => {
    // cenário
    const input = {
      numeroDoDocumento: "14041737706",
      tipoDeConexao: "bifasico",
      classeDeConsumo: "rural",
      modalidadeTarifaria: "verde",
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
      ],
    };

    const expectedOutput = {
      elegivel: false,
      razoesInelegibilidade: [
        "Classe de consumo não aceita",
        "Modalidade tarifária não aceita",
      ],
    };

    const output = avaliarCliente(input); //comportamento

    expect(output).toStrictEqual(expectedOutput); //expectativa
  });
});
