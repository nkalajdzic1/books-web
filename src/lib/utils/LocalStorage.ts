export class LocalStorage {
  public static getItem(key: string) {
    return localStorage.getItem(key) || "";
  }

  public static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
