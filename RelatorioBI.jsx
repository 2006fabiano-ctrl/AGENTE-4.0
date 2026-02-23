import { useState, useRef, useEffect } from "react";
import { Icon, ICONS, SectionTitle } from "./ui.jsx";
import { claudeChat } from "../utils/api.js";

const SYSTEM = `Você é um especialista em Business Intelligence imobiliário brasileiro. 
Responda de forma objetiva, com dados e insights acionáveis em português. 
Contexto: estamos em fevereiro de 2026. O mercado imobiliário nacional valorizou 18,2% em 2025. 
Cap rates médios: residencial 6,8%, comercial 8,2%, industrial 10,1%. 
Leilões cresceram 34% em volume com desconto médio de 38,6%. 
Seja conciso mas completo, use números concretos quando possível.`;

const SUGESTOES = [
  "Qual o melhor mercado para investir R$ 500k agora?",
  "Como está o mercado de leilões em São Paulo?",
  "Compare Curitiba x Florianópolis para 2026",
  "Qual o cap rate ideal para uma boa rentabilidade?",
  "Quais os riscos do mercado imobiliário em 2026?",
];

export default function RelatorioBI() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Olá! Sou o assistente de BI do Agente Imobiliário V4.0. Posso responder perguntas sobre mercado, analisar tendências, comparar regiões e gerar insights estratégicos. Como posso ajudar?" }
  ]);
  const [query, setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const enviar = async (texto) => {
    const msg = (texto || query).trim();
    if (!msg) return;
    setQuery("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role === "user")
        .map(m => ({ role: "user", content: m.text }));
      history.push({ role: "user", content: msg });

      const reply = await claudeChat(history, SYSTEM);
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", text: `⚠️ Erro: ${e.message}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in">
      <SectionTitle icon="brain" title="Inteligência de Negócios (BI)" subtitle="Chat analítico com IA — faça perguntas sobre o mercado imobiliário" />

      <div className="rounded-2xl border border-white/5 bg-slate-800/60 overflow-hidden flex flex-col" style={{ height: 460 }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                ${m.role === "user"
                  ? "bg-amber-500 text-black font-medium rounded-br-sm"
                  : "bg-slate-700/80 text-slate-200 border border-white/5 rounded-bl-sm"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/80 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-700 p-3 flex gap-2">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && enviar()}
            placeholder="Ex: Qual região tem o melhor cap rate hoje?"
            className="flex-1 bg-slate-900 border border-slate-600 text-white text-sm rounded-xl px-4 py-2.5
              focus:border-amber-500 focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => enviar()}
            disabled={loading || !query.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-40 transition-all"
          >
            <Icon path={ICONS.send} size={16} />
          </button>
        </div>
      </div>

      {/* Sugestões */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Sugestões rápidas</p>
        <div className="flex flex-wrap gap-2">
          {SUGESTOES.map(s => (
            <button
              key={s}
              onClick={() => enviar(s)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-700/60 text-slate-300 border border-slate-600
                hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
