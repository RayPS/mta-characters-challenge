export enum Mode {
  Singles = 'Singles',
  Doubles = 'Doubles',
}

export type Character = {
  name: string,
  image: string,
  player: number,
  done: boolean,
  selected: boolean,
}

export type Store = {
  characters: Character[],
  settingsOpened: boolean,
  settings: {
    mode: Mode,
  },
}
