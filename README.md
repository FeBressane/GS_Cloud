# AgroSatélite Cloud

Dashboard web do projeto **AgroSatélite**, desenvolvido para a Global Solution 2026 da FIAP.

## Equipe

- Camila do Prado Padalino — RM 98316
- Gabriel Teixeira Machado — RM 551570
- Felipe Cavalcante Bressane — RM 97688

## Descrição do projeto

O AgroSatélite é uma plataforma de monitoramento agrícola por sensoriamento remoto.

A solução simula um dashboard com indicadores agrícolas, como:

- NDVI médio
- Risco de pragas
- Déficit hídrico
- Produtividade esperada
- Status por talhão

A aplicação representa a camada cloud do projeto, sendo publicada no **Azure App Service** com deploy automatizado via **GitHub Actions**.

## ODS relacionados

- ODS 2 — Agricultura sustentável
- ODS 9 — Inovação e infraestrutura
- ODS 13 — Ação climática

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Azure App Service
- GitHub Actions
- GitHub Secrets
- Azure Key Vault
- Application Insights

## Como executar localmente

```bash
npm install
npm start
```

Depois, acesse:

```text
http://localhost:8080 
```

## Rotas da aplicação

| Rota | Função |
|---|---|
| `/` | Página principal do dashboard |
| `/health` | Verifica se a aplicação está funcionando |
| `/api/indicadores` | Retorna dados fictícios do monitoramento agrícola |
| `/erro` | Simula erro 500 para teste de monitoramento |

## Deploy no Azure

O deploy é feito automaticamente via GitHub Actions quando houver push na branch `main`.

Secrets necessários no GitHub:

```text
AZURE_CREDENTIALS
AZURE_WEBAPP_NAME
```

## Evidências para a entrega

Para a entrega da disciplina, devem ser incluídos prints de:

- Resource Group no Azure
- App Service criado
- URL pública funcionando
- GitHub Actions executado com sucesso
- Dois deploys automáticos
- GitHub Secrets criados
- Azure Key Vault com pelo menos um secret
- IAM / Role Assignment
- Application Insights ativo
- Log Stream ou Metrics
- Alert Rule configurada
