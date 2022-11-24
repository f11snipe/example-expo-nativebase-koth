import React, { useCallback, useState, useEffect } from 'react';
import Moment from 'moment';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { HStack, VStack, Divider, Badge, Box, Text, Icon, AspectRatio, Image, Link } from 'native-base';
import CountryFlag from 'react-native-country-flag';
import { GameData, GamePlayerData } from '../types';

// Moment.locale('en');

export interface GameBoxProps {
  game: GameData;
}

export default function GameBox(props: GameBoxProps) {
  const { game } = props;

  const [ winningPlayer, setWinningPlayer ] = useState<GamePlayerData>();

  useEffect(() => {
    const findPlayer = (username: string): GamePlayerData | undefined => game.gameplayers.find(gp => gp.player.username === username)

    setWinningPlayer(findPlayer(game.winner));
  }, [game]);

  const getOsIconUrl = (os: string) => {
    if (/linux/i.test(os)) {
      return 'https://tryhackme.com/img/linux.png';
    } else {
      return 'https://tryhackme.com/img/win.png';
    }
  };

  return (
    <Box margin={'3'}>
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
        <VStack padding={5} space={3} divider={<Divider />} w="100%">
          {/* <Badge w="100%" padding={2} colorScheme={game.game_type === 'private' ? 'rose' : 'success'}> */}
            <HStack p={3} w="100%" justifyContent="space-between" alignContent={'center'} alignItems="center" backgroundColor={game.game_type === 'private' ? 'rose.100' : 'blue.100'}>
              {winningPlayer && (
                <HStack justifyContent="space-between" alignContent={'center'} alignItems="center">
                  <AspectRatio minWidth={'50px'} ratio={4/4}>
                    <Image backgroundColor={'gray.100'} source={{
                      uri: winningPlayer.player.avatar
                    }} alt={winningPlayer.player.username} />
                  </AspectRatio>
                  <Text m={4}>{winningPlayer.player.username} wins!</Text>
                </HStack>
              )}
              <VStack p={2} textAlign={winningPlayer ? 'right' : 'left'}>
                <Text><Link href={game.game_link}>{game.game_type} match</Link></Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
                  {Moment(game.started_at).format('MMM Do YYYY, H:mm')}
                </Text>
              </VStack>
            </HStack>
          {/* </Badge> */}
          <HStack space={3}>
            <Text minW={10}>#</Text>
            <Text minW={40}><Icon as={FontAwesome5} name={'user'} color={'violet.600'} size={'sm'} mr={2} /> User</Text>
            <Text minW={20}><Icon as={FontAwesome5} name={'flag'} color={'success.600'} size={'sm'} mr={2} /> Flags</Text>
            <Text minW={20}><Icon as={FontAwesome5} name={'crown'} color={'primary.600'} size={'sm'} mr={2} /> King</Text>
            <Text minW={20}><Icon as={FontAwesome5} name={'chart-line'} color={'amber.600'} size={'sm'} mr={2} /> Score</Text>
          </HStack>

          {game.gameplayers.map((gameplayer, i) => (
            <HStack key={i} space={3}>
              <Text minW={10}>{gameplayer.rank}</Text>
              <Text minW={40}>{gameplayer.player.username}</Text>
              <Text minW={20} textAlign='center'>{gameplayer.flags}/{game.box.flags}</Text>
              <Text minW={20} textAlign='center'>{gameplayer.king}m</Text>
              <Text minW={20} textAlign='center'>{gameplayer.score}</Text>
            </HStack>
          ))}
        </VStack>
        <HStack padding={5} space={5}>
          <Text color={'danger.600'}>
            {game.resets} resets
          </Text>
          <Text color={'violet.600'}>
            {game.king_changes} king changes
          </Text>
        </HStack>
        <HStack padding={5} space={2} position="absolute" bottom="0" right="0">
          <Text>{game.box.title}</Text>
          <AspectRatio minW={5} w={5} ratio={1/1}>
            <Image source={{
              uri: getOsIconUrl(game.box.os)
            }} alt={game.box.os} />
          </AspectRatio>
        </HStack>
      </Box>
    </Box>
  );
}