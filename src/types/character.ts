export interface Character {
  readonly id: string;
  readonly hanzi: string;
  readonly pinyin: string;
  readonly translation: string;
  readonly context?: string;
  readonly collection: string;
}

export interface Collection {
  readonly id: string;
  readonly label: string;
  readonly order: number;
}
