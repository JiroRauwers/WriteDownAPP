import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Btn } from 'src/components/button/Btn';
import { Text, View } from 'src/components/Themed';
import { LineSeparator } from 'src/components/view/LineSeparator';
import { LoginModal } from 'src/screens/LoginModal';
import { Theme, useTheme } from 'src/Utils/useTheme';

const Welcome = () => {
  const theme = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState<'login' | 'signup'>(
    'login'
  );

  return (
    <View style={styles(theme).container}>
      <View style={[]}>
        <Text style={styles(theme).title}>WriteDown</Text>
        <LineSeparator />
      </View>

      <View style={[styles(theme).btnWrapper]}>
        <Btn color="enter" onPress={() => setModalVisible(true)}>
          Enter
        </Btn>
      </View>

      <LoginModal
        visible={isModalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </View>
  );
};
export default Welcome;
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex           : 1,
      alignItems     : 'center',
      justifyContent : 'space-between',
      height         : '90%',
      paddingTop     : '50%'
    },

    title: {
      fontSize   : 50,
      fontWeight : 'bold'
    },
    btnWrapper: {
      paddingVertical: 80
    },

    link: {}
  });
