import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TextInput } from 'react-native';

import { useRouter } from 'expo-router';
import { ActionModal } from 'src/components/ActionModal';
import { Btn } from 'src/components/button/Btn';
import { Text, View } from 'src/components/Themed';
import { useAuth } from 'src/context/auth';
import { useToggle } from 'src/Hooks/useToggle';
import { Theme, useTheme } from 'src/Utils/useTheme';

type ParentModalProps = {
  visible: boolean;
  handleClose: () => void;
};
type LoginModalProps = {
  theme: Theme;
  ToggleReg: () => void;
  handleClose: () => void;
};
type RegisterModalProps = {
  theme: Theme;
  ToggleLog: () => void;
  handleClose: () => void;
};

const LoginScreen = ({ theme, ToggleReg, handleClose }: LoginModalProps) => {
  const { Login } = useAuth();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const handleLogin = () => {
    Login(Email, Password);
  };

  return (
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
        <Text style={[styles(theme).Forgot]} onPress={() => ''}>
          Forgot pass ?
        </Text>

        <Btn onPress={handleLogin} color="enter">
          Login
        </Btn>
        <Text style={[styles(theme).ToggleScreenLink]} onPress={ToggleReg}>
          Not a user ?
        </Text>
      </View>
    </ActionModal>
  );
};

const RegisterScreen = ({
  theme,
  ToggleLog,
  handleClose
}: RegisterModalProps) => {
  const { SignIn } = useAuth();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');
  const [Phone, setPhone] = useState('');
  const [Name, setName] = useState('');

  const handleSignIn = () => {
    try {
      if (Password !== PasswordConfirm)
        throw new Error('Password does not match');

      SignIn({ Email, Password, Phone, Name });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ActionModal handleClose={handleClose}>
        <Text style={[styles(theme).Title]}>Register</Text>
        <View style={[styles(theme).wrapper]}>
          <TextInput
            placeholderTextColor={theme.text}
            style={[styles(theme).input]}
            onChangeText={setName}
            value={Name}
            placeholder="Name"
          />
          <TextInput
            keyboardType="phone-pad"
            placeholderTextColor={theme.text}
            style={[styles(theme).input]}
            onChangeText={setPhone}
            value={Phone}
            placeholder="Phone"
          />
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
          <TextInput
            placeholderTextColor={theme.text}
            style={[styles(theme).input]}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            value={PasswordConfirm}
            placeholder="Confirm Pass"
          />
          <Btn onPress={handleSignIn} color="enter">
            Register
          </Btn>
          <Text style={[styles(theme).ToggleScreenLink]} onPress={ToggleLog}>
            Already a user ?
          </Text>
        </View>
      </ActionModal>
    </>
  );
};

export const LoginModal = ({ handleClose, visible }: ParentModalProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/User');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [IsLogin, toggleLoginReg] = useToggle(true);

  return (
    <Modal visible={visible} transparent onRequestClose={handleClose}>
      {IsLogin ? (
        <LoginScreen
          theme={theme}
          ToggleReg={toggleLoginReg}
          handleClose={handleClose}
        />
      ) : (
        <RegisterScreen
          theme={theme}
          ToggleLog={toggleLoginReg}
          handleClose={handleClose}
        />
      )}
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    Title: {
      fontSize     : 40,
      textAlign    : 'center',
      fontWeight   : '900',
      marginBottom : 40
    },
    wrapper: {
      backgroundColor : 'transparent',
      display         : 'flex',
      flexDirection   : 'column',
      gap             : 20
    },
    input: {
      fontSize        : 16,
      backgroundColor : theme.base,
      color           : theme.text,
      padding         : 10,
      borderRadius    : 20,
      fontWeight      : 'bold',
      borderWidth     : 1
    },
    ToggleScreenLink: {
      fontSize           : 12,
      textDecorationLine : 'underline',
      textAlign          : 'center',
      marginBottom       : 15,
      marginTop          : -10,
      padding            : 10,
      paddingBottom      : 15
    },
    Forgot: {
      fontSize     : 12,
      margin       : 0,
      marginTop    : -15,
      marginRight  : 20,
      marginBottom : 5,
      textAlign    : 'right'
    }
  });
