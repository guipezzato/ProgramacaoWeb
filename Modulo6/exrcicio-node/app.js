const fs = require('fs');
const http = require('http');
const utils = require('./utils');

const textoFormatado = utils.formatarMensagem("Iniciando o sistema");
const total = utils.somar(15, 25);
const conteudo = `${textoFormatado}\nResultado do cálculo: ${total}`;

fs.writeFile('resultado.txt', conteudo, (err) => {
    if (err) throw err;
    console.log('Arquivo "resultado.txt" criado com sucesso!');
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Exercício Node.js</h1>');
    res.write('<p>Servidor rodando e respondendo HTML!</p>');
    res.end();
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});