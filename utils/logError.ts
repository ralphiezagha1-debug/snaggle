export function logError(context: string, error: any) {
  console.error(`[${context}]`, error?.message || error);
}