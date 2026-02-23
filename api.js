const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";

/**
 * Chama o backend Flask (quando configurado)
 */
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}/api/agente${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

/**
 * Chama a API da Anthropic diretamente pelo frontend
 */
export async function claudeChat(messages, systemPrompt = "") {
  const headers = { "Content-Type": "application/json" };
  if (ANTHROPIC_KEY) headers["x-api-key"] = ANTHROPIC_KEY;

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages,
  };
  if (systemPrompt) body.system = systemPrompt;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Claude API error: ${res.status}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}
