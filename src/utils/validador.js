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

exports.validarModalidadeTarifaria = (
  modalidadeTarifaria,
  razoesInelegibilidade
) => {
  const modalidadeValida = modalidadesTarifariasEnum.some(
    (modalidade) => modalidade === modalidadeTarifaria
  );
  if (!modalidadeValida)
    return razoesInelegibilidade.push(MODALIDADE_TARIFARIA);
  const modalidadesDisponiveisAceitas = modalidadesTarifariasElegiveisEnum;
  const modalidadeElegivel = modalidadesDisponiveisAceitas.some(
    (modalidade) => modalidade === modalidadeTarifaria
  );
  if (!modalidadeElegivel)
    return razoesInelegibilidade.push(MODALIDADE_TARIFARIA);
};

exports.validarQuantidadeConsumo = (historicosDeConsumo) => {
  if(historicosDeConsumo.length < 3 || historicosDeConsumo.length > 12) {
      throw new RangeError(`A quantidade mínima do histórico deve ser 3 meses e máxima de 12 meses.`)
  } return historicosDeConsumo;
};

exports.validarHistoricoConsumo = ({
  mediaDeConsumo,
  razoesInelegibilidade,
  tipoDeConexao,
  // As chaves dentro dos parâmetros é uma boa prática de Javascript, pois garante a inclusão de todos os parâmetros para chamar a função não necessariamente na mesma ordem.
}) => {
  //O método hasOwnProperty() retorna um booleano indicando se o objeto tem a propriedade especificada como sua própria propriedade
  if (!consumoMinimoParaConexao.hasOwnProperty(tipoDeConexao)) {
    //Valida se existe a chave no objeto, e, caso não exista a chave no objeto, retorna tipo de conexão não suportada
    return razoesInelegibilidade.push(CONEXAO_SUPORTADA);
  }
  //Validação do consumo
  if (consumoMinimoParaConexao[tipoDeConexao] > mediaDeConsumo)
    return razoesInelegibilidade.push(CONSUMO_BAIXO);
};
