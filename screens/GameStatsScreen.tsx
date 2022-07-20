import React, { useState } from "react";
import { Center, extendTheme } from "native-base";
import GameControls from "../components/GameControls";
import GameResults from "../components/GameResults";

export const GameStatsScreen = () => {
  const [ search, setSearch ] = useState('');
  const [ limit, setLimit ] = useState(24);
  const [ page, setPage ] = useState(1);
  const [ sort, setSort ] = useState('-started_at');

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
      <GameControls {...appProps} />
      <GameResults {...appProps} />
    </Center>
  );
}
