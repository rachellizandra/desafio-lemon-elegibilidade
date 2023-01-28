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
  validarNumeroDocumento(numeroDoDocumento);
  validarTipoDeConexao(tipoDeConexao);
  validarClasseConsumo(classeDeConsumo);
  validarModalidadeTarifaria(modalidadeTarifaria);
  validarHistoricoConsumo(historicoDeConsumo);
};
