import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from 'expo-router';
import BackIcon from 'src/components/icons/back';
import { View } from 'src/components/Themed';
import { useNotes } from 'src/Hooks/useNotes';
import { useToggle } from 'src/Hooks/useToggle';
import { Theme, useTheme } from 'src/Utils/useTheme';

const NewNote = () => {
  const [Notes] = useNotes();
  const theme = useTheme();
  const [NoteTitle, setNoteTitle] = useState(`New Note ${Notes.length || ''}`);
  const [NoteText, setNoteText] = useState('');
  const [FirstClick, toggleFClick] = useToggle(true);
  const nav = useNavigation();

  const goBack = () => {
    if (!nav.canGoBack())
      throw new Error('NewNote.tsx: goBack: Cannot go back');
    /* === To Do
     * 1. Check if NoteTitle is empty
     * 2. If empty, delete note
     * 3. If not empty, save note
     * 4. Go back
     */

    nav.goBack();
  };

  const baseStyle = StyleSheet.create({
    baseText: {
      color: theme.text
    }
  });

  const mdStyles = StyleSheet.create({
    body: {
      ...baseStyle.baseText
    },
    heading1: {
      fontSize: 32,
      ...baseStyle.baseText
    },
    heading2: {
      fontSize: 24,
      ...baseStyle.baseText
    },
    heading3: {
      fontSize: 18,
      ...baseStyle.baseText
    },
    heading4: {
      fontSize: 16,
      ...baseStyle.baseText
    },
    heading5: {
      fontSize: 13,
      ...baseStyle.baseText
    },
    heading6: {
      fontSize: 11,
      ...baseStyle.baseText
    }
  });

  const markdownItInstance = MarkdownIt({ typographer: true });

  return (
    <View style={styles(theme).Container}>
      <View style={styles(theme).TopNav}>
        <TouchableOpacity style={styles(theme).BackIcon} onPress={goBack}>
          <BackIcon width={20} height={30} translateX={3} />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={theme.text}
          style={[styles(theme).NoteTitle]}
          onFocus={() => {
            if (FirstClick) {
              console.log('First CLiCK');
              setNoteTitle('');
              toggleFClick();
            }
          }}
          onChangeText={setNoteTitle}
          value={NoteTitle}
        />
      </View>
      <View style={styles(theme).Page}>
        <SafeAreaView>
          <TextInput
            style={[styles(theme).NoteTextField]}
            multiline
            value={NoteText}
            onChangeText={setNoteText}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ height: '100%' }}
          >
            <Markdown
              mergeStyle={false}
              markdownit={markdownItInstance}
              style={mdStyles}
            >
              {NoteText}
            </Markdown>
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
      height            : '100%',
      flex              : 1,
      textAlign         : 'left',
      textAlignVertical : 'top',
      color             : theme.text,
      borderColor       : 'blue',
      borderWidth       : 1
    },
    separator: {
      marginVertical : 30,
      height         : 1,
      width          : '80%'
    }
  });
