import { FunctionComponent, PropsWithChildren } from "react";

import { theme } from "lib/styles";
import { createStyledComponent } from "lib/utils";

// create styled label
export const Label: FunctionComponent<PropsWithChildren> =
  createStyledComponent("label", theme.typography.label);
