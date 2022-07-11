import { useMemo } from 'react';
// import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { VStack, HStack, Heading, Text, Image, Center, AspectRatio } from 'native-base';
import CountryFlag from 'react-native-country-flag';
import { useAxios } from '../hooks';
import { ApiPlayerList, PlayerDataField } from '../types';
import ResultData from './ResultData';

export interface DataItem {
  label: string;
  field: PlayerDataField;
  format: (val: string|number) => string|number;
}

export interface SearchControlsProps {
  search?: string;
  limit?: number;
  page?: number;
  sort?: string;
}

export default function SearchControls(props: SearchControlsProps) {
  const { search = '', limit = 10, page = 1, sort = '-total_king' } = props;
  const { data, error, loaded } = useAxios<ApiPlayerList>(`players?filter[search]=${search}&page[size]=${limit}&page[number]=${page}&sort=${sort}`);

  const formatInteger = (val: string|number): string|number => val.toString();
  const formatFloat = (val: string|number): string|number => typeof val === 'string' ? parseFloat(val).toFixed(2) : val.toFixed(2);

  const items: DataItem[] = [
    { label: 'Games Played', field: 'num_games', format: formatInteger },
    { label: 'Average Rank', field: 'avg_rank', format: formatFloat },
    { label: 'Average Score', field: 'avg_score', format: formatFloat },
    // { label: 'Total Score', field: 'total_score', format: formatInteger },
    { label: 'Average King', field: 'avg_king', format: formatFloat },
    // { label: 'Total King', field: 'total_king', format: formatInteger },
    { label: 'Average Flags', field: 'avg_flags', format: formatFloat },
    // { label: 'Total Flags', field: 'total_flags', format: formatInteger },
  ];

  if (loaded) {
    return error ? (
      <Text>Error: {error}</Text>
    ) : (
      <VStack w="100%" space={5} alignItems="center">
        {data?.data && data.data.map((row, i) => (
          <VStack key={i} space={3} alignItems="center">
            <HStack space={2} alignItems="center">
              <AspectRatio ratio={{ base: 1/1 }} height={{ base: 25 }}>
                <Image resizeMode='cover' source={{ uri: row.attributes.avatar }} alt={row.attributes.username} />
              </AspectRatio>
              <Heading size={"md"}>{row.attributes.username}</Heading>
              <CountryFlag isoCode={row.attributes.country} size={10} />
            </HStack>
            {items.map((item, j) => (
              <ResultData key={j} label={item.label} data={item.format(row.attributes[item.field])} />
            ))}
          </VStack>
        ))}
      </VStack>
    );
  }

  return <Text>Loading...</Text>;
}
