import { User } from 'src/types/user';

import { FetchBackEnd } from '.';

export const GetUserLogin = (Email: string, Password: string) =>
  FetchBackEnd<User>('/User/Login', 'GET', { Email, Password });

export const GetUserNotes = (UserId: string | number) =>
  FetchBackEnd<{ notes: unknown[] }>('/Note', 'GET', { UserId });
