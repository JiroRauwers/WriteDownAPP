import React, { ReactNode, useEffect } from 'react';

import { useRouter, useSegments } from 'expo-router';
import { User } from 'src/types/user';
import { GetUserLogin } from 'src/Utils/fetchers/BackEnd';

type AuthContextType = {
  SignIn: (email: string, password: string) => void;
  SignOut: () => void;
  user: User | null;
};

const AuthContext = React.createContext<AuthContextType>({
  SignIn: (email: string, password: string) => {
    console.log('Not Loaded');
  },
  SignOut: () => {
    console.log('Not Loaded');
  },
  user: null
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
  }, [user, segments]);
};

export const AuthProvider = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [user, setAuth] = React.useState<User | null>(null);

  useProtectedRoute(user);

  const SignIn = async (email: string, password: string) => {
    try {
      if (!email && !password)
        throw new Error('Email and Password are required');

      const { isSuccessTypeResult, data: user } = await GetUserLogin(
        email,
        password
      );

      if (isSuccessTypeResult) setAuth(user);
    } catch (error) {
      console.log('some error', error);
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ SignIn, SignOut: () => setAuth(null), user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
