import axios from "axios";

import { Token } from "./Token";

// API class used for api endpoint calls
export class API {
  // private api instance
  private instance;

  // get the url from the constructor and create an api instance
  constructor(url = process.env.REACT_APP_API_URL) {
    this.instance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token.getToken()}`,
      },
    });
  }

  // get instance
  getInstance = () => this.instance;
}
