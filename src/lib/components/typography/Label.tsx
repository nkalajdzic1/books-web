import { FunctionComponent } from "react";

import { theme } from "lib/styles";
import { createStyledComponent } from "lib/utils";

// create styled label
export const Label: FunctionComponent = createStyledComponent(
  "label",
  theme.typography.label
);
