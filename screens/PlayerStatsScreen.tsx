import React, { useState } from "react";
import { Center, extendTheme } from "native-base";
import PlayerControls from "../components/PlayerControls";
import PlayerResults from "../components/PlayerResults";
import { PlayerDataField } from '../types';

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

export const PlayerStatsScreen = () => {
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
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <PlayerControls {...appProps} />
      <PlayerResults {...appProps} />
    </Center>
  );
}
