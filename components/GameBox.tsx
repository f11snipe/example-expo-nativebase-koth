import * as React from 'react';
import { HStack, Badge, Box, Text, Icon, AspectRatio, Image, Stack, Center } from 'native-base';
import CountryFlag from 'react-native-country-flag';
import { GameData } from '../types';

export interface GameBoxProps {
  game: GameData;
}

export default function GameBox(props: GameBoxProps) {
  const { game } = props;

  return (
    <Box margin={'3'} alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        {JSON.stringify(game)}
      </Box>
    </Box>
  );
}