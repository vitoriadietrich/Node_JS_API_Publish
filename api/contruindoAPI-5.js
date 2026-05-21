// 5 passo: Criar o metodo PUT
// agora o usuario podera atualizar o status do pedido

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
  if (rota === "/pedidos" && metodo === "GET") {
    res.end(JSON.stringify({
      mensagem: 'Lista de pedidos',
      dados: pedidos
    }));
    return;
  }

  // METODO POST
  if (rota === "/pedidos" && metodo === "POST") {
    let body = '';

    req.on('data', parte => {
      body += parte;
    });

    req.on('end', () => {
      const novoPedido = JSON.parse(body);
      pedidos.push(novoPedido);

      res.statusCode = 201;

      res.end(JSON.stringify({
        mensagem: 'Pedido criado com sucesso',
        pedido: novoPedido
      }));
    });
    return;
  }

  // METODO PUT

  if (rota === "/pedidos" && metodo === "PUT") {
    let body = '';

    req.on('data', parte => {
      body += parte;
    });
    req.on('end', () => {
      const dados = JSON.parse(body);
      let encontrado = false;

      pedidos = pedidos.map(pedido => {
        if (pedido.id === dados.id) {
          encontrado = true;
          return {
            ...pedido,
            status: dados.status
          };
        }
        return pedido;
      });
      if (!encontrado) {
        res.statusCode = 404;
        req.end(JSON.stringify({
          mensagem: 'Pedido nao encontrado'
        }));
        return;
      }
      res.end(JSON.stringify({
        mensagem: 'Pedido atualizado com sucesso',
        dados: pedidos
      }));
    });
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({
    mensagem: "Rota nao encontrada"
  }));
});
  server.listen(3000, () => {
    console.log('servidor running in http://localhost:3000');
  });
