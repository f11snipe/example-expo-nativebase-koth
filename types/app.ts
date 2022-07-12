import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { PlayerData, PlayerDataField } from './api';

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

export interface AppProps {
  search: string;
  limit: number;
  page: number;
  sort: string;
  setSearch: (val: string) => void;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
  setSort: (val: string) => void;
}
