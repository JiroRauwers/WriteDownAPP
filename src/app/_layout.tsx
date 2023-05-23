import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { AuthProvider } from 'src/context/auth';
import { useCreatedTheme } from 'src/Utils/useTheme';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf')
  });

  const Theme = useCreatedTheme();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

  return (
    <ThemeProvider value={Theme}>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && (
        <AuthProvider>
          <Slot />
        </AuthProvider>
      )}
    </ThemeProvider>
  );
}
