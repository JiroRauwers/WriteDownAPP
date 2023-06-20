import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useSearchParams } from 'expo-router';
import BackIcon from 'src/components/icons/back';
import { View } from 'src/components/Themed';
import { useNotes } from 'src/Hooks/useNotes';
import { useToggle } from 'src/Hooks/useToggle';
import { Theme, useTheme } from 'src/Utils/useTheme';

const NewNote = () => {
  const { NoteId } = useSearchParams();

  const { UpdateNote, getSelectedNote, notes } = useNotes(Number(NoteId));
  const theme = useTheme();
  const [NoteTitle, setNoteTitle] = useState(`Loading`);
  const [NoteText, setNoteText] = useState('');
  const [loading, , setIfLoading] = useToggle(true);
  const nav = useNavigation();

  useEffect(() => {
    console.log('Loadded notes >>>', notes);
    getSelectedNote().then((res) => {
      if (!res) return console.log('Note not found');
      console.log('Note >> ', res);
      setIfLoading(false);
      setNoteTitle(res.title);
      setNoteText(res.content);
      console.info('Note Loaded');
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = async () => {
    if (!nav.canGoBack())
      throw new Error('NewNote.tsx: goBack: Cannot go back');

    if (loading) nav.goBack();
    /* === To Do
     * 1. Check if NoteTitle is empty
     * 2. If empty, delete note
     * 3. If not empty, save note
     * 4. Go back
     */
    if (NoteText) {
      await UpdateNote({
        content : NoteText,
        title   : NoteTitle,
        tags    : ''
      }).then(nav.goBack);
      console.log('Note Updated');
    }
  };

  return (
    <View style={styles(theme).Container}>
      <View style={styles(theme).TopNav}>
        <TouchableOpacity style={styles(theme).BackIcon} onPress={goBack}>
          <BackIcon width={20} height={30} translateX={3} />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={theme.text}
          style={[styles(theme).NoteTitle]}
          onChangeText={setNoteTitle}
          value={NoteTitle}
        />
      </View>
      <View style={styles(theme).Page}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ height: '100%' }}
          >
            {!loading && (
              <TextInput
                style={[styles(theme).NoteTextField]}
                multiline
                value={NoteText}
                onChangeText={setNoteText}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};
export default NewNote;
const styles = (theme: Theme) =>
  StyleSheet.create({
    Container: {
      paddingTop : 30,
      display    : 'flex',
      flex       : 1
    },
    TopNav: {
      display       : 'flex',
      flexDirection : 'row'
      // height        : 50
    },
    Page: {
      flex: 1
    },
    BackIcon: {
      alignItems        : 'center',
      width             : 35,
      display           : 'flex',
      padding           : 0,
      // height      : 35,
      justifyContent    : 'center',
      textAlignVertical : 'top',
      backgroundColor   : 'transparent'
    },
    NoteTitle: {
      fontSize        : 24,
      backgroundColor : theme.base,
      color           : theme.text,
      padding         : 10,
      fontWeight      : 'bold',
      flex            : 1
    },
    NoteTextField: {
      padding           : 10,
      width             : '100%',
      minHeight         : '100%',
      height            : '100%',
      flex              : 1,
      textAlign         : 'left',
      textAlignVertical : 'top',
      color             : theme.text
    },
    separator: {
      marginVertical : 30,
      height         : 1,
      width          : '80%'
    }
  });
