"use strict";

const consumoMinimoParaConexao = require("./consumoMinimoParaConexao");
const {
  CLASSE_DE_CONSUMO,
  MODALIDADE_TARIFARIA,
  CONSUMO_BAIXO,
  CONEXAO_SUPORTADA,
} = require("./inelegivelConstantes");
const {
  classesDeConsumoEnum,
  classesDeConsumoElegiveisEnum,
} = require("../enums/classesDeConsumoEnum");
const {
  modalidadesTarifariasEnum,
  modalidadesTarifariasElegiveisEnum,
} = require("../enums/modalidadesTarifariasEnum");
const { tiposDeConexaoEnum } = require("../enums/tiposDeConexaoEnum");
const { cpfDTO } = require("./cpfDTO");
const { cnpjDTO } = require("./cnpjDTO");

exports.validarNumeroDocumento = (numeroDocumento) => {
  // Validação do cpf e cnpj
  if (RegExp(cpfDTO.pattern).test(numeroDocumento)) return; // RegExp - expressão regular, test retorna true ou false
  if (RegExp(cnpjDTO.pattern).test(numeroDocumento)) return;

  // Será lançando um erro, e a aplicação quebra, porém com json.stringify esta aplicação é documentada sobre o porque quebrou, o stringify pega o json e transforma em string
  throw new TypeError(
    `É necessário um documento válido com um dos padrões CPF: ${JSON.stringify(
      cpfDTO
    )} ou CNPJ: ${JSON.stringify(cnpjDTO)}`
  );
};

exports.validarTipoDeConexao = (tipoDeConexao, razoesInelegibilidade) => {
  const tipoDeConexaoValida = tiposDeConexaoEnum.some(
    (conexao) => conexao === tipoDeConexao
  );
  if (!tipoDeConexaoValida)
    return razoesInelegibilidade.push(CONEXAO_SUPORTADA);
};

exports.validarClasseConsumo = (classeDeConsumo, razoesInelegibilidade) => {
  const classeDeConsumoValida = classesDeConsumoEnum.some(
    (classe) => classe === classeDeConsumo
  );
  if (!classeDeConsumoValida)
    return razoesInelegibilidade.push(CLASSE_DE_CONSUMO);
  const classesDeConsumoDisponiveis = classesDeConsumoElegiveisEnum;
  const classeDeConsumoElegivel = classesDeConsumoDisponiveis.some(
    (classe) => classe === classeDeConsumo
  );
  if (!classeDeConsumoElegivel)
    return razoesInelegibilidade.push(CLASSE_DE_CONSUMO);
};

exports.validarModalidadeTarifaria = (modalidadeTarifaria) => {
  return modalidadeTarifaria;
};

exports.validarHistoricoConsumo = (mediaDeconsumo) => {
  return mediaDeconsumo;
};
