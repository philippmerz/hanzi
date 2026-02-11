interface Props {
  readonly index: number;
  readonly total: number;
  readonly learnedCount: number;
}

export const Progress = ({ index, total, learnedCount }: Props) => (
  <div className="progress">
    <span className="progress-position">
      {total > 0 ? `${index + 1} / ${total}` : '—'}
    </span>
    {learnedCount > 0 && (
      <span className="progress-learned">{learnedCount} learned</span>
    )}
  </div>
);
