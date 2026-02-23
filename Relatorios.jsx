import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Icon, ICONS, SectionTitle } from "./ui.jsx";
import { MARKET_TREND } from "../data/mockData.js";

const CHART_STYLE = {
  cs: { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#fff" },
  tick: { fill: "#64748b", fontSize: 10 },
};

const RENTABILIDADE = [
  { tipo: "Res.",  cap: 6.8,  valoriz: 12.4 },
  { tipo: "Com.",  cap: 8.2,  valoriz: 9.8  },
  { tipo: "Ind.",  cap: 10.1, valoriz: 7.2  },
  { tipo: "Terr.", cap: 0,    valoriz: 18.9 },
];

const REGIONAL = [
  { regiao: "Sudeste",      cidades: "SP, RJ, BH",                 cap: 6.9,  valoriz: 15.8, volume: 45 },
  { regiao: "Sul",          cidades: "Curitiba, Floripa, POA",      cap: 7.4,  valoriz: 20.1, volume: 22 },
  { regiao: "Nordeste",     cidades: "Recife, Fortaleza, SSA",      cap: 9.2,  valoriz: 24.3, volume: 18 },
  { regiao: "Centro-Oeste", cidades: "Brasília, Goiânia, CGR",      cap: 8.1,  valoriz: 18.7, volume: 10 },
  { regiao: "Norte",        cidades: "Manaus, Belém",               cap: 10.4, valoriz: 27.6, volume: 5  },
];

export default function Relatorios() {
  const [active, setActive] = useState("mercado");

  const tabs = [
    { id: "mercado",       label: "Análise de Mercado", icon: "trend"    },
    { id: "rentabilidade", label: "Rentabilidade",      icon: "chart"    },
    { id: "regional",      label: "Mapa Regional",      icon: "building" },
  ];

  return (
    <div className="space-y-6 animate-in">
      <SectionTitle icon="file" title="Relatórios" subtitle="Relatórios analíticos para suporte à tomada de decisão" />

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
              ${active === t.id ? "bg-amber-500 text-black" : "bg-slate-700/60 text-slate-300 hover:bg-slate-600"}`}
          >
            <Icon path={ICONS[t.icon]} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Mercado ── */}
      {active === "mercado" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-5">
              <p className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wide">Índice de Preços vs IPCA</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={MARKET_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="mes" tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
                  <YAxis tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={CHART_STYLE.cs} />
                  <Line type="monotone" dataKey="preco"  stroke="#f59e0b" strokeWidth={2} dot={false} name="Preço/m²" />
                  <Line type="monotone" dataKey="ipca"   stroke="#ef4444" strokeWidth={2} dot={false} name="IPCA %"   />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-5">
              <p className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wide">Rentabilidade por Tipo</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={RENTABILIDADE} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="tipo" tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
                  <YAxis tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={CHART_STYLE.cs} />
                  <Bar dataKey="cap"    fill="#3b82f6" radius={[4,4,0,0]} name="Cap Rate %"  />
                  <Bar dataKey="valoriz" fill="#f59e0b" radius={[4,4,0,0]} name="Valoriz. %"  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex items-start gap-3">
              <Icon path={ICONS.alert} size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-1">Insight de Mercado — Fevereiro 2026</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  O mercado imobiliário nacional encerrou 2025 com valorização média de{" "}
                  <strong className="text-amber-400">18,2%</strong> nas principais capitais, superando
                  significativamente o IPCA de 5,1%. O segmento de leilões apresentou crescimento recorde de
                  34% em volume, com descontos médios de 38,6% sobre o valor de avaliação. Destaque para mercados
                  secundários como Recife, Fortaleza e Curitiba, que superaram os mercados consolidados de SP e RJ
                  em termos de rentabilidade absoluta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Rentabilidade ── */}
      {active === "rentabilidade" && (
        <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-6">
          <p className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wide">Simulador de Rentabilidade</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Renda c/ Aluguel (anual)", value: "6,8%",        delta: "+1,2% vs Selic"     },
              { label: "Ganho de Capital (5 anos)", value: "82,4%",       delta: "Projeção moderada"  },
              { label: "ROI Total (5 anos)",         value: "116,8%",      delta: "Real, des. inflação"},
              { label: "Payback",                    value: "14,7 anos",   delta: "Abaixo da média"    },
            ].map(item => (
              <div key={item.label} className="bg-slate-700/40 rounded-xl p-4 border border-white/5">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-2xl font-black text-amber-400 font-mono">{item.value}</p>
                <p className="text-xs text-slate-400 mt-1">{item.delta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Regional ── */}
      {active === "regional" && (
        <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-5">
          <p className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wide">Desempenho por Região</p>
          <div className="space-y-3">
            {REGIONAL.map(r => (
              <div key={r.regiao} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl border border-white/5">
                <div className="w-32 shrink-0">
                  <p className="font-bold text-white text-sm">{r.regiao}</p>
                  <p className="text-xs text-slate-400">{r.cidades}</p>
                </div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full">
                  <div className="h-2 bg-amber-400 rounded-full transition-all" style={{ width: `${r.volume * 2}%` }} />
                </div>
                <div className="flex gap-4 text-xs font-mono shrink-0">
                  <span className="text-blue-400">{r.cap}% cap</span>
                  <span className="text-emerald-400">+{r.valoriz}% val</span>
                  <span className="text-slate-400">{r.volume}% vol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
