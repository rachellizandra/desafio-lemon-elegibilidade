"use strict";

exports.calcularEconomiaAnualDeCO2 = (mediaDeConsumo) => {
  const proporcaoDeEconomia = 0.084;
  let economiaAnualDeCO2 = mediaDeConsumo * proporcaoDeEconomia;
  return +economiaAnualDeCO2.toFixed(2);
};