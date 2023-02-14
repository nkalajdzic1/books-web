import { PropsWithChildren } from "react";

type IIf = { predicate: boolean } & Pick<PropsWithChildren, "children">;

export const If = ({ predicate, children }: IIf) => {
  if (!predicate) return null;

  return children;
};
