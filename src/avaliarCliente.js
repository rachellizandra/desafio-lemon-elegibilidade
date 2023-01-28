"use strict";

const {
  validarNumeroDocumento,
  validarTipoDeConexao,
  validarClasseConsumo,
  validarModalidadeTarifaria,
  validarHistoricoConsumo,
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
  validarTipoDeConexao(tipoDeConexao);
  validarClasseConsumo(classeDeConsumo);
  validarModalidadeTarifaria(modalidadeTarifaria);

  const mediaDeConsumo = calcularMediaDeConsumo(historicoDeConsumo);

  validarHistoricoConsumo(mediaDeConsumo);

  if (razoesInelegibilidade.length > 0) {
    output.razoesInelegibilidade = razoesInelegibilidade;
    return output;
  }
  output.economiaAnualDeCO2 = calcularEconomiaAnualDeCO2(mediaDeConsumo);
  output.elegivel = true;

  return output;
};
