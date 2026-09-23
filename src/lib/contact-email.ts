export type EmailConfig = { serviceId?: string; templateId?: string; publicKey?: string };

export function emailConfigured(config: EmailConfig) {
  return Object.values(config).length === 3 && Object.values(config).every(
    (value) => typeof value === "string" && !!value.trim() && !/YOUR_|PLACEHOLDER|SET_ME/i.test(value),
  );
}

export async function sendContactEmail(config: EmailConfig, params: Record<string, string>, send: typeof fetch = fetch) {
  if (!emailConfigured(config)) throw new Error("not-configured");
  const result = await send("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_id: config.serviceId, template_id: config.templateId,
      user_id: config.publicKey, template_params: params }),
    signal: AbortSignal.timeout(15000),
  });
  if (!result.ok) throw new Error("send-failed");
}
