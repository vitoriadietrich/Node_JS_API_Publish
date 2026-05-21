// 7 passo: Ajustes para publicacao e consulta da API
// agora a API esta pronta para ser publicada e consultada por outros usuarios

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

  // libercao db CORS
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Acess-control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )

  res.setHeader("Acess-Control-Allow-Headers",
    "Content-Type,")

    // METODO OPTIONS
    if (metodo === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

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

  // METODO DELETE
  if (rota === "/pedidos" && metodo === "DELETE") {
    let body = '';

    req.on ('data', parte => {
      body += parte;
    });
    req.on ('end', () => {
      const dados = JSON.parse(body);
      const tamanhaAntes = pedidos.length;
      pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
      if (pedidos.length === tamanhaAntes) {
        res.statusCode = 404;
        res.end(JSON.stringify({
          mensagem: "Pedido nao encontrado"
        }));
        return;
      }
      res.end(JSON.stringify({
        mensagem: "Pedido deletado com sucesso",
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
const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`servidor running in http://localhost:${PORT}`);
  });
