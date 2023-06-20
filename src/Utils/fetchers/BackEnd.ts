import { Note } from 'src/Hooks/useNotes';
import { User } from 'src/types/user';

import { FetchBackEnd } from '.';

export const GETUserLogin = (Email: string, Password: string) =>
  FetchBackEnd<User>('/User/Login', 'GET', { Email, Password });

export const GETUserNotes = (User: User) =>
  FetchBackEnd<{ notes: Note[] }>('/Note', 'GET', { userId: User.userId });

export type PUTNoteProps = {
  noteId: number;
  title: string;
  tags?: string;
  content: string;
};

export const DELETENote = (noteId: number) =>
  FetchBackEnd('/Note', 'DELETE', { noteId });

export const PUTNote = (
  { noteId, tags, content, title }: PUTNoteProps,
  User: User
) =>
  FetchBackEnd('/Note', 'PUT', {
    idVault     : 0,
    noteId,
    content,
    title,
    description : '',
    tags        : tags || '',
    updatedBy   : User.userId
  });

type POSTNewNoteProps = {
  Title: string;
  content: string;
  tags?: string;
};

export const POSTNewNote = (
  { Title, content, tags = '' }: POSTNewNoteProps,
  user: User
) =>
  FetchBackEnd('/Note', 'POST', {
    UserId  : user.userId,
    Title,
    content,
    idVault : 0,
    tags
  });

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
