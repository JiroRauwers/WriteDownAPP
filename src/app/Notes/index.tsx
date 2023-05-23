import { StyleSheet } from 'react-native';

import { Text, View } from 'src/components/Themed';
import { useAuth } from 'src/context/auth';
import { useNotes } from 'src/Hooks/useNotes';

export default function TabOneScreen() {
  const { user, SignOut } = useAuth();
  const [notes] = useNotes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes </Text>
      {notes.map((note, i) => (
        <Text key={i}>{note.title}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    alignItems     : 'center',
    justifyContent : 'center'
  },
  title: {
    fontSize   : 20,
    fontWeight : 'bold'
  },
  separator: {
    marginVertical : 30,
    height         : 1,
    width          : '80%'
  }
});
