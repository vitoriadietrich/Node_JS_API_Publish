// 4 passo: Criar o metodo POST
// agora o usuario podera criar o pedido novo

const http = require('http');
const url = require('url');

let pedidos = [
  {
    id: 1,
    clinte: 'Pedro',
    produto: 'Coca-cola',
    status: 'pendente'
  }
]

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/JSON');

const urlCompleta = url.parse(req.url, true);
const rota = urlCompleta.pathname;
const metodo = req.method;

// METODO GET
if (rota === "/pedidos" && metodo ==="GET") {
  res.end(JSON.stringify({
    mensagem: 'Lista de pedidos',
    dados: pedidos
  }));
  return;
}

// METODO POST
if (rota === "/pedidos" && metodo === "POST") {
  let body = '';

  req.on ('data', parte => {
    body += parte;
  });

  req.on('end', () => {
    const novoPedido =JSON.parse(body);
    pedidos.push(novoPedido);

    res.statusCode = 201;

    res.end(JSON.stringify({
      mensagem: 'Pedido criado com sucesso',
      pedido: novoPedido
    }));
    return;
  });
}

res.statusCode = 404;
res.end(JSON.stringify({
  mensagem:"Rota nao encontrada"
  }));
});

server.listen(3000, () => {
  console.log('servidor running in http://localhost:3000');
});
