import { useEffect, useState } from 'react';
import { VStack, Heading, Text, View, ScrollView } from 'native-base';
import { useBreakpointValue } from 'native-base';
import { useAxios } from '../hooks';
import { ApiPlayerList, PlayerData } from '../types';
import PlayerRow from './PlayerRow';

export interface SearchResultsProps {
  search?: string;
  limit?: number;
  page?: number;
  sort?: string;
}

export default function SearchResults(props: SearchResultsProps) {
  const { search = '', limit = 24, page = 1, sort = '-total_king' } = props;
  const { data, error, loaded } = useAxios<ApiPlayerList>(`players?filter[search]=${search}&page[size]=${limit}&page[number]=${page}&sort=${sort}`);
  const [ playerData, setPlayerData ] = useState<PlayerData[][]>([]);

  const flexCols = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  useEffect(() => {
    const results: PlayerData[][] = [];

    if (data?.data?.length) {
      for (let i = 0; i < data?.data.length; i+=flexCols) {
        const group: PlayerData[] = [];

        for (let j = i; j < i+flexCols; j++) {
          if (data.data[j]) {
            group.push(data.data[j].attributes);
          } else {
            console.warn(`Missing group player: [${i}][${j}]`);
          }
        }

        results.push(group);
      }
    }

    setPlayerData(results);
  }, [ data, flexCols ]);

  if (loaded) {
    return error ? (
      <Text>Error: {error}</Text>
    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack py="8" space={8} alignItems="center" justifyContent="center">
          <Heading>THM KoTH Players</Heading>
          <View style={{
            flexDirection: "column"
          }}>
            {playerData.map((players, i) => (
              <PlayerRow key={i} players={players} />
            ))}
          </View>
        </VStack>
      </ScrollView>
    );
  }

  return <Text>Loading...</Text>;
}
