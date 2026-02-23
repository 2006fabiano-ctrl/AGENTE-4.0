import { useState } from "react";
import { Badge, KpiCard, SectionTitle, fmtK } from "./ui.jsx";
import { LEILOES } from "../data/mockData.js";

const STATUS_COLOR = { "Ao Vivo": "red", "Agendado": "yellow", "Encerrado": "blue" };

export default function MonitorLeiloes() {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? LEILOES : LEILOES.filter(l => l.status === filter);

  return (
    <div className="space-y-6 animate-in">
      <SectionTitle icon="hammer" title="Monitor de Leilões" subtitle="Acompanhe leilões judiciais e extrajudiciais com descontos expressivos" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Leilões"  value="127"      sub="Nacionais"              color="amber"  />
        <KpiCard label="Ao Vivo Agora"  value="12"       sub="Clique para acessar"    trend={5.2} color="red" />
        <KpiCard label="Desconto Médio" value="38,6%"    sub="Sobre valor de mercado" trend={2.1} color="emerald" />
        <KpiCard label="VGV em Leilão"  value="R$ 4,8B"  sub="Valor geral de vendas"  color="blue"   />
      </div>

      <div className="flex gap-2 flex-wrap">
        {["Todos","Ao Vivo","Agendado","Encerrado"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
              ${filter === s ? "bg-amber-500 text-black" : "bg-slate-700/60 text-slate-400 hover:bg-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-xl border border-white/5 bg-slate-800/60 p-4 hover:border-amber-500/20 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs text-slate-500">{l.id}</span>
                  <Badge label={l.status}     color={STATUS_COLOR[l.status]} />
                  <Badge label={l.modalidade} color="purple" />
                </div>
                <p className="font-bold text-white">{l.tipo} — {l.endereco}</p>
                <p className="text-xs text-slate-400 mt-0.5">Data do leilão: {l.data}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-400">Lance mínimo</p>
                <p className="text-xl font-black text-amber-400 font-mono">{fmtK(l.lance)}</p>
                <p className="text-xs text-slate-500 line-through">{fmtK(l.avaliacao)}</p>
                <span className="text-xs font-black text-emerald-400">−{l.desconto}% desc.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
