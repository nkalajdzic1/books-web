import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import { theme, GlobalStyle } from "lib/styles";
import { AuthProvider } from "lib/contexts";

import AppRoutes from "routes";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
