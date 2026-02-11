import type { ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <div className="layout">{children}</div>
);
