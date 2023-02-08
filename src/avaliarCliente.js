"use strict";

const { calcularMediaDeConsumo } = require("./utils/calcularMediaDeConsumo");
const {
  calcularEconomiaAnualDeCO2,
} = require("./utils/calcularEconomiaAnualDeCO2");

const {
  validarNumeroDocumento,
  validarTipoDeConexao,
  validarClasseConsumo,
  validarModalidadeTarifaria,
  validarQuantidadeConsumo,
  validarHistoricoConsumo
} = require("./utils/validador");

exports.avaliarCliente = ({
  numeroDoDocumento,
  tipoDeConexao,
  classeDeConsumo,
  modalidadeTarifaria,
  historicoDeConsumo,
}) => {
  const output = {
    elegivel: false,
  };
  const razoesInelegibilidade = [];
  validarNumeroDocumento(numeroDoDocumento);
  validarTipoDeConexao(tipoDeConexao, razoesInelegibilidade);
  validarClasseConsumo(classeDeConsumo, razoesInelegibilidade);
  validarModalidadeTarifaria(modalidadeTarifaria, razoesInelegibilidade);
  validarQuantidadeConsumo(historicoDeConsumo);

  const mediaDeConsumo = calcularMediaDeConsumo(historicoDeConsumo);

  validarHistoricoConsumo({mediaDeConsumo, razoesInelegibilidade, tipoDeConexao});

  if (razoesInelegibilidade.length > 0) {
    output.razoesInelegibilidade = razoesInelegibilidade;
    return output;
  }
  output.economiaAnualDeCO2 = calcularEconomiaAnualDeCO2(mediaDeConsumo);
  output.elegivel = true;

  return output;
};
