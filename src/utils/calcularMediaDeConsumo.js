"use strict";

exports.calcularMediaDeConsumo = (historicosDeConsumo) => {
  const historicoInicial = 0;
  let somaDoConsumo = historicosDeConsumo.reduce(
    (total, valor) => total + valor,
    historicoInicial
  );
  let media = somaDoConsumo / historicosDeConsumo.length
  return media;
};
