import '@expo/metro-runtime';

import { ExpoRoot } from 'expo-router';
import Head from 'expo-router/head';
import { renderRootComponent } from 'expo-router/src/renderRootComponent';

// Must be exported or Fast Refresh won't update the context
export function App() {
  //@ts-ignore
  const ctx = require.context('./src/app');

  return (
    <Head.Provider>
      <ExpoRoot context={ctx} />
    </Head.Provider>
  );
}

renderRootComponent(App);
