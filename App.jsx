import { useState } from "react";
import { Icon, ICONS } from "./components/ui.jsx";
import Dashboard           from "./components/Dashboard.jsx";
import RankingLocalidades  from "./components/RankingLocalidades.jsx";
import MonitorLeiloes      from "./components/MonitorLeiloes.jsx";
import Relatorios          from "./components/Relatorios.jsx";
import RelatorioBI         from "./components/RelatorioBI.jsx";
import AnalisarOportunidade from "./components/AnalisarOportunidade.jsx";

const NAV = [
  { id: "dashboard", label: "Dashboard",  icon: "home",     component: Dashboard           },
  { id: "ranking",   label: "Ranking",    icon: "trophy",   component: RankingLocalidades  },
  { id: "leiloes",   label: "Leilões",    icon: "hammer",   component: MonitorLeiloes      },
  { id: "relatorios",label: "Relatórios", icon: "file",     component: Relatorios          },
  { id: "bi",        label: "BI Chat",    icon: "brain",    component: RelatorioBI         },
  { id: "analise",   label: "Analisar",   icon: "search",   component: AnalisarOportunidade},
];

export default function App() {
  const [active, setActive] = useState("dashboard");
  const ActivePage = NAV.find(n => n.id === active)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* ── HEADER ── */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Icon path={ICONS.building} size={15} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight leading-none font-display">AGENTE IMOBILIÁRIO</p>
              <p className="text-xs text-amber-500 font-bold tracking-widest">V4.0 · ANÁLISE DE INVESTIMENTOS</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1 bg-slate-800/60 rounded-xl p-1 border border-slate-700/50 overflow-x-auto">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap
                  ${active === n.id
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
              >
                <Icon path={ICONS[n.icon]} size={12} />
                <span className="hidden md:inline">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-8">
        <ActivePage key={active} />
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-3 text-center text-xs text-slate-600">
        Agente Imobiliário V4.0 · Powered by Claude AI · Dados para fins ilustrativos
      </footer>
    </div>
  );
}
