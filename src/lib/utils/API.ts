import axios from "axios";

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
      },
    });
  }

  // get instance
  getInstance = () => this.instance;

  // set instance and return it immediately to enable chaining commands
  setInstance = (instance: any) => (this.instance = instance);
}
