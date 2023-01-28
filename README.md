# Teste - Backend Lemon - Elegibilidade

Nem todos os clientes que desejam fazer parte da Lemon podem ser aceitos no momento. Seja por razões regulatórias ou porque não vale a pena para o cliente ou para a Lemon ter essa empresa como cliente. No processo de aquisição de clientes, fazemos a checagem de elegibilidade da mesma, através dos dados contidos na conta de luz do cliente. Caso a empresa não seja elegível, precisamos explicitar os motivos para tal. Caso ela seja elegível, precisamos calcular também a projeção da quantidade de CO2 que ela deixaria de emitir caso usasse energia limpa.

# Critérios de Elegibilidade

Para checar a elegibilidade iremos aplicar os seguintes critérios:

- Classe de consumo da cliente
    - Possíveis Valores: Comercial, Residencial, Industrial, Poder Público, e Rural.
    - Elegíveis: Comercial, Residencial e Industrial.
- Modalidade tarifária
    - Possíveis Valores: Branca, Azul, Verde, e Convencional.
    - Elegíveis: Convencional, Branca.
- Consumo mínimo do cliente
    - O cálculo deve ser feito utilizando a média dos 12 valores mais recentes do histórico de consumo.
        - Clientes com tipo de conexão Monofásica só são elegíveis caso tenham consumo médio acima de 400 kWh.
        - Clientes com tipo de conexão Bifásica só são elegíveis caso tenham consumo médio acima de 500 kWh.
        - Clientes com tipo de conexão Trifásica só são elegíveis caso tenham consumo médio acima de 750 kWh.
- Para calcular a projeção da **economia anual** de CO2, considere que para serem gerados 1000 kWh no Brasil são emitidos em média 84kg de CO2.

# Exemplos 

## Exemplo 1
- Entrada:
{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160, // 9 meses atras
    6941, // 10 meses atras
    4597  // 11 meses atras
  ]
}

- Saída:
{
   "elegivel": true,
   "economiaAnualDeCO2": 5553.24,
}

## Exemplo 2 
- Entrada: 
{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "rural",
  "modalidadeTarifaria": "verde",
  "historicoDeConsumo": [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160, // 9 meses atras
  ]
}

- Saída: 
{
  "elegivel": false,
	"razoesInelegibilidade": [
    "Classe de consumo não aceita",
    "Modalidade tarifária não aceita"
  ]
}

# Instruções

- Sugerimos implementar a solução descrita em `Node.js`, porém não é um requisito. Você tem a liberdade de implementar na linguagem que desejar.
- Lembre-se de escrever testes
- Enviar o código fonte da solução para a pessoa da Lemon que te enviou esse teste, da forma desejada:
    - Zip com o código fonte
    - Link para o repositório git

# Resumo do desafio 

1-	Instalou-se as dependências: 
  1.1- npm i –D @types/jest -> este pacote contém as definições dos tipos para o Jest
  1.2- npm install --save-dev jest -> framework do Javascript para testes
  1.3- npm install coverage -> pacote para cobertura de testes
  2-	Os dados do tipo.js foram separados em pastas divididas em DTO e Enums;
3-	Criou-se um arquivo para validação de critérios de elegibilidade -> validador.js;
4-	Criou-se um arquivo com a função de avaliar o cliente, passando todas as funções do validador.js;
5-	Criou-se uma pasta de testes divida em dois arquivos: um para avaliar o cliente de acordo com solicitado como desafio (avaliarCliente.spec.js) e outro para validação dos critérios de elegibilidade (validador.spec.js);
6-	Foram 2 testes para avaliar cliente sendo elegível ou não, e 8 testes para verificar a validação das funções que indicam a inelegibilidade;
7-	**Para rodar em sua máquina, execute o comando npm install e npm run test:coverage para verificar o funcionamento dos testes.**



