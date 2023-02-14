import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { theme, GlobalStyle } from "lib/styles";
import AppRoutes from "routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
