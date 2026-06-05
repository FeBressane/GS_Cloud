const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const APP_NAME = process.env.APP_NAME || "AgroSatélite Cloud";

const indicadores = {
  produto: "AgroSatélite",
  descricao: "Dashboard agrícola com dados fictícios de sensoriamento remoto.",
  atualizadoEm: new Date().toISOString(),
  talhoes: [
    {
      nome: "Talhão A",
      cultura: "Soja",
      ndvi: 0.76,
      riscoPraga: 22,
      deficitHidrico: 12,
      produtividadeEsperada: 91,
      status: "Saudável"
    },
    {
      nome: "Talhão B",
      cultura: "Milho",
      ndvi: 0.38,
      riscoPraga: 48,
      deficitHidrico: 31,
      produtividadeEsperada: 68,
      status: "Atenção"
    },
    {
      nome: "Talhão C",
      cultura: "Café",
      ndvi: 0.24,
      riscoPraga: 71,
      deficitHidrico: 46,
      produtividadeEsperada: 52,
      status: "Crítico"
    }
  ]
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache"
  });

  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`[ERRO] Falha ao carregar arquivo: ${filePath}`);

      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });

      res.end("Erro ao carregar a página.");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache"
    });

    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  if (req.url === "/health") {
    return sendJson(res, 200, {
      status: "OK",
      app: APP_NAME,
      ambiente: process.env.NODE_ENV || "production",
      timestamp
    });
  }

  if (req.url === "/api/indicadores") {
    return sendJson(res, 200, indicadores);
  }

  if (req.url === "/erro") {
    console.error(`[ERRO SIMULADO] Rota /erro acessada em ${timestamp}`);

    return sendJson(res, 500, {
      status: "ERRO",
      mensagem: "Erro 500 simulado para teste de Application Insights e Alert Rule.",
      timestamp
    });
  }

  if (req.url === "/" || req.url === "/index.html") {
    const filePath = path.join(__dirname, "index.html");
    return sendHtml(res, filePath);
  }

  return sendJson(res, 404, {
    status: "NAO_ENCONTRADO",
    mensagem: "Rota não encontrada.",
    rotasDisponiveis: ["/", "/health", "/api/indicadores", "/erro"]
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} rodando na porta ${PORT}`);
});
