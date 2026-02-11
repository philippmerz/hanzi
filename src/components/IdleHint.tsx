interface Props {
  readonly message: string;
}

export const IdleHint = ({ message }: Props) => (
  <p className="idle-hint">{message}</p>
);
