// TYPES
import { User } from '../types/typeDefinitions';
//

// STORAGE
import { getUserFromStorage } from './storage';
//

export const generateHeaders = (headers: Headers): Headers => {
  let userJson: string | null = getUserFromStorage();

  let user: User = userJson && JSON.parse(userJson);

  if (user && user.token) {
    headers.append(`Authorization`, `Bearer ${user.token}`);
  }
  return headers;
};
