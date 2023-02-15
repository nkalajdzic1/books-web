import { FunctionComponent } from "react";

import { Page } from "./Page";

export const LoadingPage: FunctionComponent = () => {
  return <Page withHeader={false}>Loading...</Page>;
};
