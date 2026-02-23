import { useState } from "react";
import { Icon, ICONS, SectionTitle } from "./ui.jsx";
import { claudeChat } from "../utils/api.js";

const TIPOS   = ["Apartamento","Casa","Comercial","Terreno","Galpão","Studio","Kitnet"];
const CIDADES = ["São Paulo","Rio de Janeiro","Curitiba","Belo Horizonte","Recife","Fortaleza","Florianópolis","Brasília","Porto Alegre","Salvador","Goiânia","Manaus"];

function buildPrompt(form) {
  return `Você é um especialista em investimentos imobiliários no Brasil. Analise esta oportunidade e retorne SOMENTE um JSON (sem markdown) com:
{
  "score": <0-100>,
  "recomendacao": <"COMPRAR"|"AGUARDAR"|"EVITAR">,
  "cap_rate": <número%>,
  "roi_5anos": <número%>,
  "payback_anos": <número>,
  "preco_justo_m2": <R$/m²>,
  "potencial_valorizacao": <% ao ano>,
  "riscos": [<string>, <string>, <string>],
  "oportunidades": [<string>, <string>, <string>],
  "resumo": "<3 linhas>"
}

Imóvel:
- Tipo: ${form.tipo}
- Cidade: ${form.cidade}
- Área: ${form.area} m²
- Preço pedido: R$ ${form.preco}
- Aluguel potencial: R$ ${form.aluguel}/mês
- Observações: ${form.obs || "Nenhuma"}`;
}

export default function AnalisarOportunidade() {
  const [form, setForm] = useState({ tipo: "Apartamento", cidade: "São Paulo", area: "", preco: "", aluguel: "", obs: "" });
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const analisar = async () => {
    setLoading(true); setResult(null); setError(null);
    try {
      const raw = await claudeChat([{ role: "user", content: buildPrompt(form) }]);
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setError("Não foi possível processar a análise. Verifique os dados e tente novamente.");
    }
    setLoading(false);
  };

  const recStyle = result ? {
    COMPRAR: { text: "text-emerald-400", bg: "from-emerald-900/40 to-emerald-800/20 border-emerald-500/30" },
    AGUARDAR:{ text: "text-amber-400",   bg: "from-amber-900/40 to-amber-800/20 border-amber-500/30"   },
    EVITAR:  { text: "text-red-400",     bg: "from-red-900/40 to-red-800/20 border-red-500/30"         },
  }[result.recomendacao] : null;

  const disabled = loading || !form.area || !form.preco || !form.aluguel;

  return (
    <div className="space-y-6 animate-in">
      <SectionTitle icon="search" title="Análise de Oportunidade IA" subtitle="Powered by Claude – avaliação inteligente do potencial de investimento" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── FORM ── */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Tipo de Imóvel", key: "tipo",   opts: TIPOS   },
              { label: "Cidade",         key: "cidade", opts: CIDADES },
            ].map(({ label, key, opts }) => (
              <div key={key}>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-1">{label}</label>
                <select
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2
                    focus:border-amber-500 focus:outline-none"
                >
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Área (m²)",         key: "area",    ph: "75"     },
              { label: "Preço (R$)",         key: "preco",   ph: "500000" },
              { label: "Aluguel/mês (R$)",   key: "aluguel", ph: "3500"   },
            ].map(({ label, key, ph }) => (
              <div key={key}>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-1">{label}</label>
                <input
                  type="number"
                  placeholder={ph}
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2
                    focus:border-amber-500 focus:outline-none placeholder-slate-600"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide block mb-1">Observações adicionais</label>
            <textarea
              rows={3}
              placeholder="Ex: imóvel em leilão com desconto, localização privilegiada, necessita reforma..."
              value={form.obs}
              onChange={e => set("obs", e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2
                focus:border-amber-500 focus:outline-none placeholder-slate-600 resize-none"
            />
          </div>

          <button
            onClick={analisar}
            disabled={disabled}
            className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all
              disabled:opacity-40 disabled:cursor-not-allowed
              bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400
              flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Analisando com IA...
              </>
            ) : (
              <>
                <Icon path={ICONS.brain} size={16} />
                Analisar Oportunidade
              </>
            )}
          </button>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* ── RESULT ── */}
        <div className="min-h-40">
          {!result && !loading && (
            <div className="h-full rounded-2xl border border-dashed border-slate-600 flex flex-col items-center justify-center text-center p-8 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-700/50 flex items-center justify-center text-slate-500">
                <Icon path={ICONS.search} size={22} />
              </div>
              <p className="text-slate-400 text-sm">
                Preencha os dados do imóvel e clique em{" "}
                <strong className="text-amber-400">Analisar Oportunidade</strong>{" "}
                para obter um relatório completo gerado por IA.
              </p>
            </div>
          )}

          {result && recStyle && (
            <div className={`rounded-2xl border bg-gradient-to-br ${recStyle.bg} p-5 space-y-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Recomendação</p>
                  <p className={`text-3xl font-black ${recStyle.text}`}>{result.recomendacao}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Score</p>
                  <p className="text-4xl font-black text-white">
                    {result.score}<span className="text-lg text-slate-400">/100</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Cap Rate",        v: `${result.cap_rate}%`                                         },
                  { l: "ROI 5 anos",      v: `${result.roi_5anos}%`                                       },
                  { l: "Payback",         v: `${result.payback_anos} anos`                                 },
                  { l: "Preço Justo/m²",  v: `R$ ${result.preco_justo_m2?.toLocaleString("pt-BR")}`       },
                  { l: "Valoriz. Anual",  v: `${result.potencial_valorizacao}% a.a.`                       },
                ].map(({ l, v }) => (
                  <div key={l} className="bg-black/20 rounded-lg p-2">
                    <p className="text-xs text-slate-400">{l}</p>
                    <p className="font-black text-white text-sm font-mono">{v}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-emerald-400 uppercase font-bold mb-1">Oportunidades</p>
                  <ul className="space-y-1">
                    {result.oportunidades?.map((o, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1">
                        <span className="text-emerald-400 mt-0.5">+</span>{o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-red-400 uppercase font-bold mb-1">Riscos</p>
                  <ul className="space-y-1">
                    {result.riscos?.map((r, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1">
                        <span className="text-red-400 mt-0.5">−</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-slate-300 leading-relaxed">{result.resumo}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
