import { StyleSheet } from 'react-native';

import { Btn } from 'src/components/button/Btn';
import BackIcon from 'src/components/icons/back';
import { LinkBtn } from 'src/components/link/Btn';
import { Text, View } from 'src/components/Themed';
import { useNotes } from 'src/Hooks/useNotes';
import { Theme, useTheme } from 'src/Utils/useTheme';

const NotesHome = () => {
  const [Notes] = useNotes();
  const theme = useTheme();

  return (
    <View style={styles(theme).Container}>
      <View style={styles(theme).TopNav}>
        <Btn onPress={() => ''}>
          <BackIcon />
        </Btn>
      </View>
      <View style={styles(theme).Page}>
        <LinkBtn to="/Notes/New"> New Note</LinkBtn>
        {Notes.map((note, i) => (
          <Text key={i}>{note.title}</Text>
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
    separator: {
      marginVertical : 30,
      height         : 1,
      width          : '80%'
    }
  });
