import { StyleSheet } from 'react-native';

import { Btn } from 'src/components/button/Btn';
import { Text, View } from 'src/components/Themed';
import { useAuth } from 'src/context/auth';

export default function TabOneScreen() {
  const { user, SignOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>user : {user?.name}</Text>
      <Btn onPress={SignOut}>Sign Out</Btn>
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
