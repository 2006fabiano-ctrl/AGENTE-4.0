export const MARKET_TREND = [
  { mes: "Jan", preco: 8200,  aluguel: 3100, ipca: 4.5 },
  { mes: "Fev", preco: 8350,  aluguel: 3150, ipca: 4.8 },
  { mes: "Mar", preco: 8100,  aluguel: 3200, ipca: 5.1 },
  { mes: "Abr", preco: 8500,  aluguel: 3300, ipca: 5.3 },
  { mes: "Mai", preco: 8750,  aluguel: 3400, ipca: 5.0 },
  { mes: "Jun", preco: 9100,  aluguel: 3550, ipca: 4.9 },
  { mes: "Jul", preco: 9300,  aluguel: 3600, ipca: 4.7 },
  { mes: "Ago", preco: 9600,  aluguel: 3700, ipca: 4.6 },
  { mes: "Set", preco: 9400,  aluguel: 3750, ipca: 4.8 },
  { mes: "Out", preco: 9800,  aluguel: 3900, ipca: 5.0 },
  { mes: "Nov", preco: 10100, aluguel: 4000, ipca: 5.2 },
  { mes: "Dez", preco: 10500, aluguel: 4150, ipca: 5.1 },
];

export const RANKINGS = [
  { rank: 1, bairro: "Itaim Bibi",      cidade: "São Paulo",        cap: 6.8,  valorizacao: 18.2, score: 94, tipo: "Residencial", risco: "Baixo" },
  { rank: 2, bairro: "Leblon",           cidade: "Rio de Janeiro",   cap: 5.9,  valorizacao: 14.5, score: 91, tipo: "Residencial", risco: "Baixo" },
  { rank: 3, bairro: "Boa Viagem",       cidade: "Recife",           cap: 8.4,  valorizacao: 22.1, score: 89, tipo: "Misto",       risco: "Médio" },
  { rank: 4, bairro: "Batel",            cidade: "Curitiba",         cap: 7.2,  valorizacao: 19.8, score: 87, tipo: "Residencial", risco: "Baixo" },
  { rank: 5, bairro: "Lourdes",          cidade: "Belo Horizonte",   cap: 7.8,  valorizacao: 17.3, score: 85, tipo: "Comercial",   risco: "Médio" },
  { rank: 6, bairro: "Meireles",         cidade: "Fortaleza",        cap: 9.1,  valorizacao: 24.6, score: 83, tipo: "Misto",       risco: "Médio" },
  { rank: 7, bairro: "Pioneiros",        cidade: "Campo Grande",     cap: 10.2, valorizacao: 28.4, score: 80, tipo: "Residencial", risco: "Alto"  },
  { rank: 8, bairro: "Jardim Camburi",   cidade: "Vitória",          cap: 8.9,  valorizacao: 20.5, score: 78, tipo: "Residencial", risco: "Médio" },
];

export const LEILOES = [
  { id: "L001", tipo: "Apartamento", endereco: "Av. Paulista, 1200 – SP",           avaliacao: 850000,  lance: 510000,  desconto: 40, data: "28/02/2026", status: "Ao Vivo",   modalidade: "1ª Praça"      },
  { id: "L002", tipo: "Casa",        endereco: "Rua das Flores, 45 – RJ",           avaliacao: 620000,  lance: 430000,  desconto: 31, data: "05/03/2026", status: "Agendado",  modalidade: "2ª Praça"      },
  { id: "L003", tipo: "Comercial",   endereco: "Alameda Santos, 800 – SP",          avaliacao: 1200000, lance: 720000,  desconto: 40, data: "10/03/2026", status: "Agendado",  modalidade: "1ª Praça"      },
  { id: "L004", tipo: "Terreno",     endereco: "Rod. BR-101, km 45 – SC",           avaliacao: 380000,  lance: 190000,  desconto: 50, data: "12/03/2026", status: "Agendado",  modalidade: "2ª Praça"      },
  { id: "L005", tipo: "Apartamento", endereco: "Rua Visconde de Pirajá – RJ",       avaliacao: 1500000, lance: 975000,  desconto: 35, data: "15/03/2026", status: "Encerrado", modalidade: "1ª Praça"      },
  { id: "L006", tipo: "Galpão",      endereco: "Distrito Industrial – MG",          avaliacao: 2200000, lance: 1320000, desconto: 40, data: "20/03/2026", status: "Agendado",  modalidade: "Extrajudicial" },
];

export const DISTRIBUICAO = [
  { name: "Residencial", value: 54, color: "#f59e0b" },
  { name: "Comercial",   value: 23, color: "#3b82f6" },
  { name: "Industrial",  value: 11, color: "#8b5cf6" },
  { name: "Terrenos",    value: 12, color: "#10b981" },
];

export const VOLUME_MENSAL = [
  { mes: "Jan", volume: 1240 }, { mes: "Fev", volume: 1380 }, { mes: "Mar", volume: 1520 },
  { mes: "Abr", volume: 1350 }, { mes: "Mai", volume: 1680 }, { mes: "Jun", volume: 1920 },
  { mes: "Jul", volume: 2100 }, { mes: "Ago", volume: 1850 }, { mes: "Set", volume: 2250 },
  { mes: "Out", volume: 2400 }, { mes: "Nov", volume: 2180 }, { mes: "Dez", volume: 2600 },
];
