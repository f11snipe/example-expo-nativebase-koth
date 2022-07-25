import React, { useState } from 'react';
// import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { VStack, HStack, Center, Text, Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { useAxios } from '../hooks';
import { AppProps } from '../types';
import { playerDataItems } from '../data';

export default function PlayerControls(props: AppProps) {
  const [ value, setValue ] = useState(props.search);
  const SearchIcon = () => <Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />;

  const doSearch = () => {
    props.setSearch(value)
    props.setPage(1);
  }

  return (
    <Center mt={10}>
      <VStack space={5} alignSelf="center">
        <Input variant={'underlined'} placeholder={'Search Players'} InputLeftElement={<SearchIcon />} value={value} onChangeText={val => setValue(val)} onBlur={doSearch} />
      </VStack>
    </Center>
  );
}
