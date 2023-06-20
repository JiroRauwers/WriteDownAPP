import { useColorScheme as NativeUseColorScheme } from 'react-native';
export const useColorScheme = () => {
  const colorScheme = NativeUseColorScheme() == 'light' ? 'Frappe' : 'Mocha';

  return colorScheme;
};
