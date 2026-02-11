interface Props {
  readonly pinyin: string;
  readonly translation: string;
}

export const Translation = ({ pinyin, translation }: Props) => (
  <div className="translation">
    <span className="translation-pinyin">{pinyin}</span>
    <span className="translation-meaning">{translation}</span>
  </div>
);
