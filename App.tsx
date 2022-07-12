import React, { useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Container
} from "native-base";
import SearchControls from "./components/SearchControls";
import SearchResults from "./components/SearchResults";
import { PlayerDataField } from './types';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export type SortOrder = 'asc' | 'desc';
export type SortField = PlayerDataField;

export default function App() {
  const [ search, setSearch ] = useState('');
  const [ limit, setLimit ] = useState(24);
  const [ page, setPage ] = useState(1);
  const [ sort, setSort ] = useState('-total_score');

  const appProps = {
    search,
    limit,
    page,
    sort,
    setSearch,
    setLimit,
    setPage,
    setSort,
  };

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <SearchControls {...appProps} />
        <SearchResults {...appProps} />
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
