import jwt from "jwt-decode";

import { TOKEN_KEY } from "lib/constants";
import { LocalStorage } from "./LocalStorage";

export interface ITokenContent {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export class Token {
  public static getToken() {
    return LocalStorage.getItem(TOKEN_KEY) || "";
  }

  public static setToken(value: string) {
    LocalStorage.setItem(TOKEN_KEY, value);
  }

  public static removeToken() {
    LocalStorage.removeItem(TOKEN_KEY);
  }

  public static getDecodedToken(): ITokenContent | null {
    const token = Token.getToken();
    if (!token) return null;

    return jwt(Token.getToken());
  }

  public static isTokenValid(): boolean {
    const decodedToken: ITokenContent | null = Token.getDecodedToken();

    if (!decodedToken || Date.now() * 1000 < decodedToken?.exp) {
      Token.removeToken();
      return false;
    }

    return true;
  }
}
