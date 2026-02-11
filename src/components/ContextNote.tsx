interface Props {
  readonly context: string;
}

export const ContextNote = ({ context }: Props) => (
  <p className="context-note">{context}</p>
);
