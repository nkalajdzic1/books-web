import { FunctionComponent, PropsWithChildren, ReactElement } from "react";

type IIf = { predicate: boolean };

export const If: FunctionComponent<PropsWithChildren<IIf>> = ({
  predicate,
  children,
}): ReactElement | null => {
  if (!predicate) return null;

  return <>{children}</>;
};
