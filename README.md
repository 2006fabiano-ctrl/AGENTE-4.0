# 🏢 Agente Imobiliário V4.0

Solução de análise de investimentos imobiliários com IA integrada, painel interativo, rankings, monitor de leilões e relatórios de BI.

---

## ✨ Funcionalidades

| Módulo | Descrição |
|---|---|
| **Dashboard** | KPIs, gráficos de preço/m², distribuição e volume |
| **Ranking** | Localidades ordenadas por score, cap rate e valorização |
| **Monitor de Leilões** | Leilões judiciais e extrajudiciais com descontos |
| **Relatórios** | Análise de mercado, rentabilidade e mapa regional |
| **BI Chat** | Chat analítico com IA (Claude) para insights de mercado |
| **Analisar Oportunidade** | Score, recomendação e análise completa via IA |

---

## 🚀 Deploy na Vercel (5 minutos)

### Pré-requisitos
- Conta gratuita na [Vercel](https://vercel.com)
- Conta gratuita no [GitHub](https://github.com)
- Chave da API Anthropic → [console.anthropic.com](https://console.anthropic.com)

### Passo a passo

**1. Instalar dependências localmente (para testar)**
```bash
npm install
```

**2. Criar arquivo `.env` na raiz do projeto**
```bash
cp .env.example .env
```
Edite o `.env` e preencha sua chave:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...sua-chave-aqui...
VITE_API_BASE_URL=http://localhost:5000
```

**3. Testar localmente**
```bash
npm run dev
# Acesse: http://localhost:3000
```

**4. Subir para o GitHub**
```bash
git init
git add .
git commit -m "Agente Imobiliário V4.0"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/agente-imobi.git
git push -u origin main
```

**5. Deploy na Vercel**
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório do GitHub
3. Em **Environment Variables**, adicione:
   - `VITE_ANTHROPIC_API_KEY` → sua chave Anthropic
   - `VITE_API_BASE_URL` → URL do backend Flask (se tiver)
4. Clique em **Deploy**
5. ✅ Seu link público ficará disponível em: `https://agente-imobi-XXXXX.vercel.app`

---

## 🔧 Backend Flask (opcional)

O frontend funciona standalone com IA. Para conectar o backend Flask:

```bash
cd backend
pip install flask flask-cors flask-sqlalchemy
python app.py
```

Configure a variável `VITE_API_BASE_URL` apontando para a URL do backend.

---

## 📁 Estrutura do Projeto

```
agente-imobi/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui.jsx                  # Componentes compartilhados
│   │   ├── Dashboard.jsx
│   │   ├── RankingLocalidades.jsx
│   │   ├── MonitorLeiloes.jsx
│   │   ├── Relatorios.jsx
│   │   ├── RelatorioBI.jsx         # Chat BI com Claude
│   │   └── AnalisarOportunidade.jsx # Análise com Claude
│   ├── data/
│   │   └── mockData.js             # Dados de demonstração
│   ├── utils/
│   │   └── api.js                  # Helpers de API
│   ├── App.jsx                     # Componente principal + roteamento
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

---

## 🛡️ Nota de Segurança

> ⚠️ A chave `VITE_ANTHROPIC_API_KEY` fica exposta no bundle do frontend.  
> Para produção com múltiplos usuários, mova as chamadas à API do Claude para o **backend Flask**, que passa a chave como variável de ambiente segura no servidor.

---

## 📄 Licença

MIT — use e adapte livremente.
