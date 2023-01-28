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
  3878,
  9760,
  5976,
  2797,
  2481,
  5731,
  7538,
  4392,
  7859,
  4160,
  6941,
  4597
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
  3878,
  9760,
  5976,
  2797,
  2481,
  5731,
  7538,
  4392,
  7859,
  4160,
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

- Instalou-se as dependências:
- npm i –D @types/jest -> este pacote contém as definições dos tipos para o Jest
- npm install --save-dev jest -> framework do Javascript para testes
- npm install coverage -> pacote para cobertura de testes
- Os dados do tipo.js foram separados em pastas divididas em DTO e Enums;
- Criou-se um arquivo para validação de critérios de elegibilidade -> validador.js;
- Criou-se um arquivo com a função de avaliar o cliente, passando todas as funções do validador.js;
- Criou-se uma pasta de testes divida em dois arquivos: um para avaliar o cliente de acordo com solicitado como desafio (avaliarCliente.spec.js) e outro para validação dos critérios de elegibilidade (validador.spec.js);
- Foram 2 testes para avaliar cliente sendo elegível ou não, e 8 testes para verificar a validação das funções que indicam a inelegibilidade;
- **Para rodar em sua máquina, execute o comando npm install e npm run test:coverage para verificar o funcionamento dos testes.**
