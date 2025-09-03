export async function joinWaitlist(email: string) {
  const res = await fetch("/api/join-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json && json.error) || `HTTP ${res.status}`);
  return json as { success: boolean; deduped?: boolean; queued?: boolean };
}