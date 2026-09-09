interface User {
  email: string;
  password: string;
  createdAt: number;
}

const users = new Map<string, User>();

export function addUser(email: string, password: string) {
  users.set(email, { email, password, createdAt: Date.now() });
}

export function getUser(email: string) {
  return users.get(email) || null;
}

export function hasUser(email: string) {
  return users.has(email);
}
