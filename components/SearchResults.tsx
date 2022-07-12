import { useEffect, useState } from 'react';
import { VStack, HStack, Heading, Text, View, ScrollView, Button, Spinner } from 'native-base';
import { useBreakpointValue } from 'native-base';
import { useAxios } from '../hooks';
import { ApiPlayerList, PlayerData, AppProps } from '../types';
import PlayerRow from './PlayerRow';

export default function SearchResults(props: AppProps) {
  const { search, limit, page, sort } = props;
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

  const prevPage = () => props.setPage(props.page - 1);
  const nextPage = () => props.setPage(props.page + 1);

  const Pagination = () => (
    <HStack space={4} alignItems='center'>
      <Button size={'sm'} colorScheme={'info'} isDisabled={!!data?.meta?.pagination?.page && data?.meta?.pagination?.page <= 1} onPress={prevPage}>
        prev
      </Button>
      <Text fontSize={'sm'} color='muted.400'>Page {data?.meta?.pagination?.page} of {data?.meta?.pagination?.pages}</Text>
      <Button size={'sm'} colorScheme={'info'} isDisabled={data?.meta?.pagination?.page == data?.meta?.pagination?.pages} onPress={nextPage}>
        next
      </Button>
    </HStack>
  );

  if (loaded) {
    return error ? (
      <Heading>Error: {error}</Heading>
    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack py="4" space={4} alignItems="center" justifyContent="center">
          <Heading size={'sm'}>{data?.meta?.pagination?.count} Players</Heading>
          <Pagination />
          <View style={{
            flexDirection: "column"
          }}>
            {playerData.map((players, i) => (
              <PlayerRow key={i} players={players} />
            ))}
          </View>
          <Pagination />
        </VStack>
      </ScrollView>
    );
  }

  return (
    <HStack mt={10} space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading players" />
      <Heading color="primary.500" fontSize="lg">
        Loading
      </Heading>
    </HStack>
  );
}
