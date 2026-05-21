// 2 passo: exibiçao da rota e do metodo
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/JSON');

const urlCompleta = url.parse(req.url, true);
const rota = urlCompleta.pathname;
const metodo = urlCompleta.method;

  res.end(JSON.stringify({
    message: 'Servidor funcionando!',
    rota: rota,
    metodo: metodo
  }));
});

server.listen(3000, () => {
  console.log('servidor running in http://localhost:3000');
});
