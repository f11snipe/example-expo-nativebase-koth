import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { PlayerDataItem } from '../types';

export const formatFloat = (val: string|number, pos = 2): string|number => typeof val === 'string' ? parseFloat(val).toFixed(pos) : val.toFixed(pos);
export const formatInteger = (val: string|number): string|number => val >= 1000 ? formatFloat(parseInt(val.toString()) / 1000, 1) + 'k' : val.toString();

export const playerDataItems: PlayerDataItem[] = [
  // { label: 'Games Played', field: 'num_games', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'crown', iconColor: 'primary.600' },
  { label: 'Average Rank', field: 'avg_rank', format: formatFloat, iconType: FontAwesome5, iconName: 'hackerrank', iconColor: 'primary.600' }, // hackerrank
  { label: 'Average Score', field: 'avg_score', format: formatFloat, iconType: MaterialIcons, iconName: 'score', iconColor: 'primary.600' },
  { label: 'Total Score', field: 'total_score', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'scoreboard', iconColor: 'primary.600' },
  { label: 'Average King', field: 'avg_king', format: formatFloat, iconType: MaterialCommunityIcons, iconName: 'crown', iconColor: 'primary.600' }, // crown
  { label: 'Total King', field: 'total_king', format: formatInteger, iconType: MaterialCommunityIcons, iconName: 'summit', iconColor: 'primary.600' },
  { label: 'Average Flags', field: 'avg_flags', format: formatFloat, iconType: FontAwesome5, iconName: 'flag', iconColor: 'primary.600' },
  { label: 'Total Flags', field: 'total_flags', format: formatInteger, iconType: FontAwesome5, iconName: 'flag-checkered', iconColor: 'primary.600' },
];
