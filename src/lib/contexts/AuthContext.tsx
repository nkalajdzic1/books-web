import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { Token, ITokenContent } from "lib/utils";

export interface IAuthContextValues {
  token: string | null;
  tokenData: ITokenContent | null;
  setToken: (val: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
}

const defaultValue: IAuthContextValues = {
  token: null,
  tokenData: null,
  setToken: () => null,
  removeToken: () => null,
  isLoggedIn: false,
};

export const AuthContext = createContext(defaultValue);

export interface IAuthProvider extends PropsWithChildren {
  value?: IAuthContextValues;
}

export const AuthProvider: FunctionComponent<IAuthProvider> = ({
  children,
  value,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    value?.isLoggedIn || Token.isTokenValid() || false
  );
  const [token, setToken] = useState<string>(
    value?.token || Token.getToken() || ""
  );

  const removeToken = useCallback(() => {
    Token.removeToken();
    setToken("");
    setIsLoggedIn(false);
  }, []);

  const changeToken = useCallback((value: string) => {
    Token.setToken(value);
    setToken(value);
    setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={Object.assign(
        {
          token,
          tokenData: Token.decodeToken(token),
          setToken: changeToken,
          removeToken,
          isLoggedIn,
        },
        value
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): IAuthContextValues => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext cannot be used outside a AuthProvider");

  return context;
};
