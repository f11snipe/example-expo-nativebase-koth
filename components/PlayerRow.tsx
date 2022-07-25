import React, { useEffect, useState } from 'react';
import { ScrollView, VStack, Heading, View, Icon, Text } from 'native-base';
import { useBreakpointValue } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { PlayerData } from '../types';
import PlayerBox from './PlayerBox';

export interface PlayerRowProps {
  players: PlayerData[];
}

export default function PlayerRow(props: PlayerRowProps) {
  const { players } = props;

  const flexDir = useBreakpointValue({
    base: "column",
    lg: "row"
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack py="8" space={8} alignItems="center" justifyContent="center">
        <View style={{
          flexDirection: flexDir
        }}>
          {players.map((player, i) => (
            <PlayerBox key={i} player={player} />
          ))}
        </View>
      </VStack>
    </ScrollView>
  );
}