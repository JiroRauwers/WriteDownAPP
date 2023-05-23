import { User } from 'src/types/user';

import { FetchBackEnd } from '.';

type GetUserLoginResponse = {
  data: User | null;
  exception: null;
  isSuccessTypeResult: boolean;
  messages: string[];
  resultType: number;
};

export const GetUserLogin = (Email: string, Password: string) =>
  FetchBackEnd<GetUserLoginResponse>('/User/Login', 'GET', { Email, Password });
