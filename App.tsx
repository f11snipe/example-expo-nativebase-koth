import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { customTheme } from './constants';
import { useCachedResources, useColorScheme } from './hooks';
import { Navigation } from './navigation';

// Setup type overrides for custom theme data types
type CustomThemeType = typeof customTheme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
