import React from 'react';
import { HStack, Badge, Box, Text, Icon, AspectRatio, Image, Stack, Center } from 'native-base';
import CountryFlag from 'react-native-country-flag';
import { PlayerData } from '../types';
import { playerDataItems } from '../data';

export interface PlayerBoxProps {
  player: PlayerData;
}

export default function PlayerBox(props: PlayerBoxProps) {
  const { player } = props;

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
        <Box>
          <AspectRatio w="100%" minWidth={'230px'} ratio={5/4}>
            <Image source={{
              uri: player.avatar
            }} alt={player.username} />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
            bg: "violet.400"
          }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }} position="absolute" bottom="0" px="3" py="1.5">
            {player.username}
          </Center>
          <Center borderColor={'warmGray.300'} position="absolute" bottom="0" right="0">
            <CountryFlag isoCode={player.country} size={30} />
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            {playerDataItems.map((item, i) => (
              <HStack key={i} space={6} alignItems="center" justifyContent="space-between">
                <Icon as={item.iconType} name={item.iconName} color={item.iconColor} size='sm' />
                <Text fontSize={'xs'} color="muted.600">{item.label}</Text>
                <Badge colorScheme='info'>{item.format(player[item.field])}</Badge>
              </HStack>
            ))}
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                {player.num_games} Games Played
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}