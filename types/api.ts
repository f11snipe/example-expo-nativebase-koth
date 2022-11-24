/**
 * API Data Types (django rest json api)
 */
export type ApiDataType = 'Box' | 'Player' | 'Game' | 'GamePlayer';
export type GameType = 'private' | 'public';
export type GameStatus = 'stopped' | 'running' | 'complete';

export interface BoxData {
  os: string;
  title: string;
  flags: number;
}

export interface PlayerAttributes {
  level: number;
  avatar: string;
  username: string;
  country: string;
}

export interface PlayerData extends PlayerAttributes {
  num_games: number;
  avg_rank: number;
  avg_score: number;
  total_score: number;
  avg_king: number;
  total_king: number;
  avg_flags: number;
  total_flags: number;
}

export type PlayerDataField = keyof PlayerData & string;

export interface GamePlayerData {
  game: string;
  player: PlayerAttributes;
  score: number;
  flags: number;
  rank: number;
  king: number;
}

export interface GameData {
  started_at: Date;
  finished_at?: Date;
  first_hacked?: Date;
  status: GameStatus;
  game_type: GameType;
  king_found: boolean;
  king_changes: number;
  game_link: string;
  winner: string;
  resets: number;
  creator_name: string;
  box: BoxData;
  gameplayers: GamePlayerData[];
}

export interface ApiData<T> {
  id: string | number;
  type: ApiDataType;
  attributes: T;
};

export interface ApiListResponse<T> {
  data: ApiData<T>[];
  links?: {
    first: string | null,
    last: string | null,
    next: string | null,
    prev: string | null,
  };
  meta?: {
    pagination?: {
      page: number,
      pages: number,
      count: number,
    }
  };
}

export interface ApiSingleResponse<T> {
  data: ApiData<T>;
}

export type ApiBoxList = ApiListResponse<BoxData>;
export type ApiBoxSingle = ApiSingleResponse<BoxData>;
export type ApiGameList = ApiListResponse<GameData>;
export type ApiGameSingle = ApiSingleResponse<GameData>;
export type ApiPlayerList = ApiListResponse<PlayerData>;
export type ApiPlayerSingle = ApiSingleResponse<PlayerData>;

export interface AxiosProps {
  url: string;
  method: string;
  payload?: string;
}
