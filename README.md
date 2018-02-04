# Tabela de Usuários

Tabela de usuários para ser instanciada em uma página

## Features

* Pode ser instalado via npm ou diretamente na nossa CDN - {`https://bancointer.cdn/static/lib/js/usertable.js`} * mock
* Desenvolvido em ES6
* Biblioteca em UMD compatível com RequireJS, CommonsJS, RhinoJS e etc.
* Testado com Karma + Jasmine
* ESLint com [ESLint](http://eslint.org/).
* Testado no Chrome, Safari e Firefox

## Processo e organização

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

## Iniciando o desenvolvimento

Antes tenha certeza que possui o Node verso 8+ na sua máquina. Plugin desenvolvido e testado em um macOS High Sierra na versão do node v8.9.3.

1. Baixe o projeto
2. Digite `npm i`
3. Para rodar localmente digite `npm start`. Rodará na porta 3000 ( localhost:3000/raw.html para versão isolada e /index.html para a completa)
4. Para build digite `npm run build`
5. Testes: `npm test`

## Scripts

* `npm run build` - testa e produz uma versão minificada no path ./lib
* `npm start` - Sobe uma página de testes atualizável com watch
* `npm test` - Roda os testes
* `npm run test:watch` - Igual acima mas em watch mode
* `npm run ghpages` - Publica a Github Pages do projeto

## Documentação

Para carregar o widget de tabela são necessários dois arquivos:
```html
<link rel="stylesheet" href="lib/inter.userstable.min.css">
<script src="lib/inter.userstable.min.js"></script>
```

## Instanciar
Eles podem ser achados na pasta /lib do projeto ou requistados no CDN:
{`https://bancointer.cdn/static/lib/**.*`} * mock

Depois basta inserir o código abaixo:
```javascript
const userstable = new InterUsersTable({
  element: document.querySelector('#table-placeholder'), //	elemento html container
  endpoint: 'https://api.myjson.com/bins/1as255', // endpoint dos usuários
  forceEndpoint: false,	//	força o get na URL atualizando o localstorage
  perPage: 10	//	quantas usuários por página
});
```

## Métodos/Eventos
Para escutar eventos basta usar o método "on". Os eventos suportados são:
- loaded: disparado quando o widget é instanciado
- usersFetched: quando os usuários são carregados seja do endpoint seja do LocalStorage

Exemplo:
```javascript
userstable.on('loaded', (event) => {
  console.info(event)
});

userstable.on('usersFetched', (event) => {
  console.info(event)
});
```

