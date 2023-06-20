import { User } from 'src/types/user';

import { FetchBackEnd } from '.';

export const GETUserLogin = (Email: string, Password: string) =>
  FetchBackEnd<User>('/User/Login', 'GET', { Email, Password });

export const GETUserNotes = (UserId: string | number) =>
  FetchBackEnd<{ notes: unknown[] }>('/Note', 'GET', { UserId });

type POSTNewUserProps = {
  Email: string;
  Password: string;
  Name: string;
  Phone: string;
};
export const POSTNewUser = ({
  Email,
  Password,
  Name,
  Phone
}: POSTNewUserProps) => {
  if (!Email || !Password || !Name || !Phone) throw new Error('Missing data');
  return FetchBackEnd<User>('/User', 'POST', {
    name     : Name,
    email    : Email,
    fone     : Phone,
    password : Password
  });
};
