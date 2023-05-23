import { useEffect, useState } from 'react';

import { useAuth } from 'src/context/auth';
import { GetUserNotes } from 'src/Utils/fetchers/BackEnd';

type Note = { title: string };
export const useNotes = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);

  const AddNote = async () => {};

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, isSuccessTypeResult } = await GetUserNotes(user.userId);
      console.log('data', data?.notes[0]);

      if (isSuccessTypeResult) setNotes(data.notes as Note[]);
    };
    fetchNotes();
  }, []);

  return [notes];
};
