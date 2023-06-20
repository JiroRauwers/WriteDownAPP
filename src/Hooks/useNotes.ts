import { useEffect, useState } from 'react';

import { useAuth } from 'src/context/auth';
import {
  DELETENote,
  GETUserNotes,
  POSTNewNote,
  PUTNote,
  PUTNoteProps
} from 'src/Utils/fetchers/BackEnd';

export type Note = {
  idVault: 0;
  vault: null;
  content: string;
  title: string;
  description: string;
  previewText: string;
  tags: string;
  id: number;
};
export const useNotes = (noteID?: number) => {
  const { user } = useAuth();
  console.info('Note ID ', noteID);

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote] = useState<number | undefined>(noteID);
  const [prevSelectedNote, setPrevSelectedNote] = useState<number | undefined>(
    selectedNote
  );

  const deleteNote = (noteId: number) => {
    console.log('delete this ', noteId);
    return DELETENote(noteId).then(fetchNotes);
  };

  const UpdateNote = async ({
    content,
    tags,
    title
  }: Omit<PUTNoteProps, 'noteId'>) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    PUTNote({ content, noteId: noteID!, tags, title }, user).then(fetchNotes);

  const CreateNote = async ({
    Title,
    Tags,
    Text
  }: {
    Title: string;
    Tags?: string;
    Text: string;
  }) => {
    const { isSuccessTypeResult } = await POSTNewNote(
      { Title, content: Text, tags: Tags },
      user
    );
    fetchNotes();
    return isSuccessTypeResult;
  };

  const getSelectedNote = () => {
    return fetchNotes().then((notes) => {
      console.log(
        'Notes FETCHED IN GETSELECTEDNOTE',
        notes.map((n) => n.id)
      );

      return notes.find((n) => n.id === selectedNote);
    });
  };

  const fetchNotes = async () => {
    const { data, isSuccessTypeResult } = await GETUserNotes(user);
    console.info('fetching Notes');
    if (!isSuccessTypeResult) throw new Error('Error fetching notes');
    console.debug(
      'Fetched notes -',
      data.notes.map((n) => n.id)
    );
    setNotes(data.notes);
    setPrevSelectedNote(selectedNote);

    return data.notes;
  };
  useEffect(() => {
    console.log('selected', selectedNote, ' - prev', prevSelectedNote);
    if (prevSelectedNote !== selectedNote || !selectedNote) fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote]);

  return {
    notes,
    selectedNote,
    CreateNote,
    getSelectedNote,
    UpdateNote,
    deleteNote
  };
};
