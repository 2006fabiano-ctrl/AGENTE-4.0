import { useState } from "react";
import { Badge, SectionTitle } from "./ui.jsx";
import { RANKINGS } from "../data/mockData.js";

const RISCO_COLOR = { Baixo: "green", Médio: "yellow", Alto: "red" };

export default function RankingLocalidades() {
  const [sort, setSort]           = useState("score");
  const [filterRisco, setFilter]  = useState("Todos");

  const data = [...RANKINGS]
    .filter(r => filterRisco === "Todos" || r.risco === filterRisco)
    .sort((a, b) => {
      if (sort === "score")       return b.score       - a.score;
      if (sort === "cap")         return b.cap         - a.cap;
      if (sort === "valorizacao") return b.valorizacao - a.valorizacao;
      return 0;
    });

  const SortBtn = ({ k, label }) => (
    <button
      onClick={() => setSort(k)}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
        ${sort === k ? "bg-amber-500 text-black" : "bg-slate-700/60 text-slate-400 hover:bg-slate-600"}`}
    >
      {label}
    </button>
  );

  const FilterBtn = ({ r }) => (
    <button
      onClick={() => setFilter(r)}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
        ${filterRisco === r ? "bg-slate-600 text-white" : "bg-slate-800/60 text-slate-400 hover:bg-slate-700"}`}
    >
      {r}
    </button>
  );

  return (
    <div className="space-y-6 animate-in">
      <SectionTitle icon="trophy" title="Ranking de Localidades" subtitle="Classificação por score de investimento, cap rate e valorização" />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <SortBtn k="score"       label="Score"       />
          <SortBtn k="cap"         label="Cap Rate"    />
          <SortBtn k="valorizacao" label="Valorização" />
        </div>
        <div className="ml-auto flex gap-2">
          {["Todos","Baixo","Médio","Alto"].map(r => <FilterBtn key={r} r={r} />)}
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-slate-800/80">
            <tr>
              {["#", "Bairro / Cidade", "Tipo", "Cap Rate", "Valorização", "Score", "Risco"].map(h => (
                <th key={h} className="text-left text-xs font-bold uppercase tracking-widest text-slate-400 px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={r.bairro} className="border-t border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-4 py-3">
                  <span className={`font-black text-lg ${
                    i === 0 ? "text-amber-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-slate-500"
                  }`}>{i + 1}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-white text-sm">{r.bairro}</p>
                  <p className="text-xs text-slate-400">{r.cidade}</p>
                </td>
                <td className="px-4 py-3"><Badge label={r.tipo} color="blue" /></td>
                <td className="px-4 py-3 font-mono text-amber-400 font-bold">{r.cap}%</td>
                <td className="px-4 py-3 font-mono text-emerald-400 font-bold">+{r.valorizacao}%</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full w-16">
                      <div className="h-1.5 bg-amber-400 rounded-full" style={{ width: `${r.score}%` }} />
                    </div>
                    <span className="text-sm font-black text-white">{r.score}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge label={r.risco} color={RISCO_COLOR[r.risco]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
