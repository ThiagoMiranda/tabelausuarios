# Widget de Upload

Widget de upload desenvolvido para ser usado em integração com o Sambavídeos

## Features

* Pode ser instalado via npm ou diretamente na nossa CDN - {`http://static.sambavideos.sambatech.com/sambauploader/latest/samba.uploader.min.js`}
* Desenvolvido em ES6
* Biblioteca em UMD compatível com RequireJS, CommonsJS, RhinoJS e etc.
* Testado com Karma + Jasmine
* ESLint com [ESLint](http://eslint.org/).

## Processo

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

1. Baixe o projeto
2. Digite `npm i`
3. Para rodar localmente digite `npm start`. Rodará na porta 8000 ( Github pages na 8080 )
4. Para build digite `npm run build`
5. Testes: `npm test`

## Scripts

* `npm run build` - testa e produz uma versão minificada no path ./dist
* `npm start` - Sobe uma página de testes atualizável com watch
* `npm test` - Roda os testes
* `npm run test:watch` - Igual acima mas em watch mode
* `npm run ghpages` - Publica a Github Pages do projeto

### Projeto no npm
https://www.npmjs.com/package/samba-uploader ( instalável pelo comando `npm i --save samba-uploader` )

## Documentação

Exemplos e documentação podem ser encontrados no http://sambatech.github.io/uploadWidget/
