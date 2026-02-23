import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { KpiCard, SectionTitle } from "./ui.jsx";
import { MARKET_TREND, DISTRIBUICAO, VOLUME_MENSAL } from "../data/mockData.js";

const CHART_STYLE = {
  contentStyle: { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#fff" },
  tick: { fill: "#64748b", fontSize: 11 },
};

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in">
      <SectionTitle icon="home" title="Painel de Controle" subtitle="Visão consolidada do mercado imobiliário em tempo real" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Preço Médio/m²"   value="R$ 10.500"  sub="São Paulo – Dez/2025"     trend={3.2}  color="amber"  />
        <KpiCard label="Cap Rate Médio"   value="7,4%"        sub="Carteira nacional"         trend={0.3}  color="blue"   />
        <KpiCard label="Leilões Ativos"   value="127"         sub="↑ 14 novos esta semana"   trend={12.4} color="emerald"/>
        <KpiCard label="Score Médio"      value="84,2"        sub="Top localidades"           trend={2.1}  color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-slate-800/60 p-5">
          <p className="text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase">
            Evolução Preço/m² vs Aluguel
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MARKET_TREND}>
              <defs>
                <linearGradient id="gPreco" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAluguel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="mes" tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
              <YAxis tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CHART_STYLE.contentStyle} />
              <Area type="monotone" dataKey="preco"   stroke="#f59e0b" strokeWidth={2} fill="url(#gPreco)"   name="Preço/m²"   />
              <Area type="monotone" dataKey="aluguel" stroke="#3b82f6" strokeWidth={2} fill="url(#gAluguel)" name="Aluguel/m²" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-5">
          <p className="text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase">Distribuição por Tipo</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={DISTRIBUICAO} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {DISTRIBUICAO.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={CHART_STYLE.contentStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {DISTRIBUICAO.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name}
                </span>
                <span className="font-bold" style={{ color: d.color }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/60 p-5">
        <p className="text-sm font-bold text-slate-300 mb-4 tracking-wide uppercase">Volume de Transações – Unid./Mês</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={VOLUME_MENSAL} barSize={28}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="mes" tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
            <YAxis tick={CHART_STYLE.tick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={CHART_STYLE.contentStyle} />
            <Bar dataKey="volume" fill="url(#barGrad)" radius={[6,6,0,0]} name="Unidades" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
