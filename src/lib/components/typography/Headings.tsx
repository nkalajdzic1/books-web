import { FunctionComponent, PropsWithChildren } from "react";

import { theme } from "lib/styles";
import { createStyledComponent } from "lib/utils";

// create styled headings
export const H1: FunctionComponent<PropsWithChildren> = createStyledComponent(
  "h1",
  theme.typography.h1
);
export const H2: FunctionComponent<PropsWithChildren> = createStyledComponent(
  "h2",
  theme.typography.h2
);
export const H3: FunctionComponent<PropsWithChildren> = createStyledComponent(
  "h3",
  theme.typography.h3
);
export const H5: FunctionComponent<PropsWithChildren> = createStyledComponent(
  "h5",
  theme.typography.h5
);
