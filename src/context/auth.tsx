import React, { ReactNode, useEffect } from 'react';

import { useRouter, useSegments } from 'expo-router';
import { User } from 'src/types/user';
import { GETUserLogin, POSTNewUser } from 'src/Utils/fetchers/BackEnd';

type SignInProps = {
  Email: string;
  Password: string;
  Name: string;
  Phone: string;
};

type AuthContextType = {
  Login: (email: string, password: string) => void;
  SignIn: ({ Email, Name, Password, Phone }: SignInProps) => void;
  SignOut: () => void;
  user: User | null;
};

const notLoaddedFn = (...args: unknown[]) =>
  console.log('Not Loaded, passed args', args);

const AuthContext = React.createContext<AuthContextType>({
  Login   : notLoaddedFn,
  SignIn  : notLoaddedFn,
  SignOut : notLoaddedFn,
  user    : null
});

export const useAuth = () => {
  return React.useContext(AuthContext) as { user: User } & AuthContextType;
};

const useProtectedRoute = (user: User | null) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('auth', segments);
    console.log('auth user:', user);

    if (!user) router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments]);
};

export const AuthProvider = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [user, setAuth] = React.useState<User | null>(null);

  useProtectedRoute(user);

  const Login = async (email: string, password: string) => {
    try {
      if (!email && !password)
        throw new Error('Email and Password are required');

      const { isSuccessTypeResult, data: user } = await GETUserLogin(
        email,
        password
      );

      if (isSuccessTypeResult) setAuth(user);
    } catch (error) {
      console.log('some error', error);
      setAuth(null);
    }
  };

  const SignIn = async ({ Email, Name, Password, Phone }: SignInProps) => {
    try {
      if (!Email && !Password)
        throw new Error('Email and Password are required');

      const { isSuccessTypeResult: Register } = await POSTNewUser({
        Email,
        Password,
        Name,
        Phone
      });
      if (!Register) return;
      const { isSuccessTypeResult: Logged, data: user } = await GETUserLogin(
        Email,
        Password
      );
      if (!Logged) throw new Error('User not logged In');
      setAuth(user);
    } catch (error) {
      console.log('some error', error);
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ SignIn, Login, SignOut: () => setAuth(null), user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
