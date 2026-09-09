const codeStore = new Map<string, { code: string; expires: number }>();

export function setCode(email: string, code: string) {
  codeStore.set(email, { code, expires: Date.now() + 5 * 60 * 1000 });
}

export function getCode(email: string) {
  const stored = codeStore.get(email);
  if (!stored) return null;
  if (Date.now() > stored.expires) {
    codeStore.delete(email);
    return null;
  }
  return stored.code;
}

export function deleteCode(email: string) {
  codeStore.delete(email);
}
