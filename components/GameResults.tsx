import React, { useEffect, useState } from 'react';
import { VStack, HStack, Heading, Text, View, ScrollView, Button, Spinner } from 'native-base';
import { useBreakpointValue } from 'native-base';
import { useAxios } from '../hooks';
import { ApiGameList, GameData, AppProps } from '../types';
import GameBox from './GameBox';

export default function GameResults(props: AppProps) {
  const { search, limit, page, sort } = props;
  const { data, error, loaded } = useAxios<ApiGameList>(`games/?filter[search]=${search}&page[size]=${limit}&page[number]=${page}&sort=${sort}`);
  const [ gameData, setGameData ] = useState<GameData[]>([]);

  const flexCols = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  useEffect(() => {
    let results: GameData[] = [];

    if (data?.data?.length) {
      results = data.data.map(row => row.attributes);
    }

    setGameData(results);
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
          <Heading size={'sm'}>{data?.meta?.pagination?.count} Games</Heading>
          <Pagination />
          <View style={{
            flexDirection: "column"
          }}>
            {gameData.map((game, i) => (
              <GameBox key={i} game={game} />
            ))}
          </View>
          <Pagination />
        </VStack>
      </ScrollView>
    );
  }

  return (
    <HStack mt={10} space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading games" />
      <Heading color="primary.500" fontSize="lg">
        Loading
      </Heading>
    </HStack>
  );
}
