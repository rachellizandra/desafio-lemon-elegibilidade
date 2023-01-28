"use strict";

exports.calcularMediaDeConsumo = (historicosDeConsumo) => {
  const historicoInicial = 0;
  return historicosDeConsumo.reduce(
    (total, valor) => total + valor,
    historicoInicial
  );
};
