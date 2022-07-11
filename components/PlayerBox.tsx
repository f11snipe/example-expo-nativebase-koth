import { HStack, Badge, Box, Text, Icon, AspectRatio, Image, Stack, Center } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { PlayerData, PlayerDataField } from '../types';

export type PlayerDataIconType = typeof MaterialIcons | typeof MaterialCommunityIcons | typeof FontAwesome5;

export interface PlayerDataItem {
  label: string;
  field: PlayerDataField;
  format: (val: string|number) => string|number;
  iconType: PlayerDataIconType;
  iconName: string;
  iconColor: string;
}

export interface PlayerBoxProps {
  player: PlayerData;
}

const formatFloat = (val: string|number, pos = 2): string|number => typeof val === 'string' ? parseFloat(val).toFixed(pos) : val.toFixed(pos);
const formatInteger = (val: string|number): string|number => val >= 1000 ? formatFloat(parseInt(val.toString()) / 1000, 1) + 'k' : val.toString();

const items: PlayerDataItem[] = [
  // { label: 'Games Played', field: 'num_games', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'crown', iconColor: 'primary.600' },
  { label: 'Average Rank', field: 'avg_rank', format: formatFloat, iconType: FontAwesome5, iconName: 'hackerrank', iconColor: 'primary.600' }, // hackerrank
  { label: 'Average Score', field: 'avg_score', format: formatFloat, iconType: MaterialIcons, iconName: 'score', iconColor: 'primary.600' },
  { label: 'Total Score', field: 'total_score', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'scoreboard', iconColor: 'primary.600' },
  { label: 'Average King', field: 'avg_king', format: formatFloat, iconType: MaterialCommunityIcons, iconName: 'crown', iconColor: 'primary.600' }, // crown
  { label: 'Total King', field: 'total_king', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'shield-crown', iconColor: 'primary.600' },
  { label: 'Average Flags', field: 'avg_flags', format: formatFloat, iconType: FontAwesome5, iconName: 'flag', iconColor: 'primary.600' },
  { label: 'Total Flags', field: 'total_flags', format: formatInteger, iconType: FontAwesome5, iconName: 'flag-checkered', iconColor: 'primary.600' },
];

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
          <AspectRatio w="100%" ratio={5/4}>
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
            {items.map((item, i) => (
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