// ── Shared UI primitives ───────────────────────────────────────────────────

export const Icon = ({ path, size = 20 }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

export const ICONS = {
  home:      "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  chart:     "M18 20V10 M12 20V4 M6 20v-6",
  trophy:    "M8 21h8 M12 17v4 M7 4H4.5A2.5 2.5 0 0 0 2 6.5v0A2.5 2.5 0 0 0 4.5 9H7 M17 4h2.5A2.5 2.5 0 0 1 22 6.5v0A2.5 2.5 0 0 1 19.5 9H17 M7 4h10v8a5 5 0 0 1-10 0V4z",
  hammer:    "M14.5 17.5L3 6l1.5-1.5 11.5 11.5-1.5 1.5z M15.5 2.5L21.5 8.5 M3 22l4-4",
  file:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  brain:     "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
  settings:  "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41",
  trend:     "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  building:  "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18 M2 22h20 M10 7h4 M10 11h4 M10 15h4 M10 19h4",
  search:    "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z M16 16l4.5 4.5",
  alert:     "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  send:      "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
};

export const Badge = ({ label, color = "blue" }) => {
  const map = {
    green:  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    yellow: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    red:    "bg-red-500/20 text-red-400 border-red-500/30",
    blue:   "bg-blue-500/20 text-blue-400 border-blue-500/30",
    purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${map[color] || map.blue}`}>
      {label}
    </span>
  );
};

export const KpiCard = ({ label, value, sub, trend, color = "amber" }) => {
  const bars = {
    amber:  "from-amber-500 to-orange-500",
    blue:   "from-blue-500 to-cyan-500",
    emerald:"from-emerald-500 to-teal-500",
    purple: "from-purple-500 to-violet-500",
    red:    "from-red-500 to-rose-500",
  };
  const pos = trend > 0;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 backdrop-blur-sm">
      <div className={`absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r ${bars[color] || bars.amber}`} />
      <p className="text-xs font-medium tracking-widest text-slate-400 uppercase mb-2">{label}</p>
      <p className="text-2xl font-black text-white font-mono">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      {trend !== undefined && (
        <span className={`inline-flex items-center gap-1 text-xs font-bold mt-2 ${pos ? "text-emerald-400" : "text-red-400"}`}>
          {pos ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
};

export const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
      <Icon path={ICONS[icon]} size={18} />
    </div>
    <div>
      <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

export const fmtK = (v) =>
  v >= 1_000_000 ? `R$ ${(v / 1_000_000).toFixed(1)}M`
  : v >= 1_000   ? `R$ ${(v / 1_000).toFixed(0)}K`
  : `R$ ${v}`;
