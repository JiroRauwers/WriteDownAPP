import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';
import { ActionModal } from 'src/components/ActionModal';
import { Btn } from 'src/components/button/Btn';
import { Text } from 'src/components/Themed';
import { useAuth } from 'src/context/auth';
import { Theme, useTheme } from 'src/Utils/useTheme';

type LoginModalProps = {
  visible: boolean;
  handleClose: () => void;
};

export const LoginModal = ({ handleClose, visible }: LoginModalProps) => {
  const { SignIn, user } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = () => {
    SignIn(Email, Password);
  };

  useEffect(() => {
    if (user) router.replace('/User');
  }, [user]);

  return (
    <Modal visible={visible} transparent onRequestClose={handleClose}>
      <ActionModal handleClose={handleClose}>
        <Text style={[styles(theme).Title]}>Welcome Back</Text>
        <View style={[styles(theme).wrapper]}>
          <TextInput
            style={[styles(theme).input]}
            placeholderTextColor={theme.text}
            onChangeText={setEmail}
            value={Email}
            placeholder="Email"
          />
          <TextInput
            placeholderTextColor={theme.text}
            style={[styles(theme).input]}
            onChangeText={setPassword}
            secureTextEntry
            value={Password}
            placeholder="Password"
          />
          <Btn onPress={handleLogin} color="enter">
            Login
          </Btn>
        </View>
      </ActionModal>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    Title: {
      fontSize     : 40,
      textAlign    : 'center',
      marginBottom : 40
    },
    wrapper: {
      display       : 'flex',
      flexDirection : 'column',
      gap           : 20
    },
    input: {
      fontSize        : 16,
      backgroundColor : theme.base,
      color           : theme.text,
      padding         : 10,
      borderRadius    : 20,
      borderColor     : theme.overlay0,
      borderWidth     : 1
    }
  });
