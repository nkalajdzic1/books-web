import { FunctionComponent } from "react";

import { theme } from "lib/styles";
import { createStyledComponent } from "lib/utils";

// create styled text
export const Text: FunctionComponent = createStyledComponent(
  "div",
  theme.typography.text
);
