import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Btn } from 'src/components/button/Btn';
import BackIcon from 'src/components/icons/back';
import { LinkBtn } from 'src/components/link/Btn';
import { View } from 'src/components/Themed';
import { useNotes } from 'src/Hooks/useNotes';
import { Theme, useTheme } from 'src/Utils/useTheme';

const NotesHome = () => {
  const { notes, deleteNote } = useNotes();
  const theme = useTheme();

  useEffect(() => {
    console.log('reload notes');
  });

  return (
    <View style={styles(theme).Container}>
      <View style={styles(theme).TopNav}>
        <Btn onPress={() => ''}>
          <BackIcon />
        </Btn>
      </View>
      <View style={styles(theme).Page}>
        <View style={styles(theme).NoteBtn}>
          <LinkBtn style={styles(theme).NewNote} to="/Notes/New">
            New Note
          </LinkBtn>
          <LinkBtn style={styles(theme).User} to="/User">
            User
          </LinkBtn>
        </View>
        {notes.map((note, i) => (
          <View style={styles(theme).NoteBtn} key={i}>
            <LinkBtn style={styles(theme).NoteLink} to={`/Notes/${note.id}`}>
              {note.title}
            </LinkBtn>
            <Btn
              style={styles(theme).delete}
              onPress={() => deleteNote(note.id)}
            >
              Delete
            </Btn>
          </View>
        ))}
      </View>
    </View>
  );
};
export default NotesHome;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: Theme) =>
  StyleSheet.create({
    Container: {
      paddingTop : 30,
      display    : 'flex',
      flex       : 1
    },
    TopNav: {
      display       : 'flex',
      flexDirection : 'column',
      minHeight     : 100
    },
    Page: {
      flex       : 1,
      alignItems : 'center'
    },
    NoteTitle: {
      fontSize   : 20,
      fontWeight : 'bold'
    },
    NoteBtn: {
      flexDirection  : 'row',
      alignContent   : 'center',
      justifyContent : 'space-between',
      width          : '90%'
    },
    separator: {
      marginVertical : 30,
      height         : 1,
      width          : '80%'
    },
    NoteLink: {
      flex: 1
    },
    delete: {
      backgroundColor : theme.red,
      alignSelf       : 'center',
      color           : theme.base,
      height          : 40,
      padding         : 10,
      borderRadius    : 2
    },
    NewNote: {
      color           : theme.base,
      backgroundColor : theme.green
    },
    User: {
      color           : theme.base,
      backgroundColor : theme.blue
    }
  });
