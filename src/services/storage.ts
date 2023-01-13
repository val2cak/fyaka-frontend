export interface User {
  username: string;
  token: string;
  tokenExpiry: Date;
}

export function getUserFromStorage(): string | null {
  return localStorage.getItem('@user');
}

export function setUserToStorage(user: User): void {
  localStorage.setItem('@user', JSON.stringify(user));
}

export function removeUserFromStorage(): void {
  return localStorage.removeItem('@user');
}
