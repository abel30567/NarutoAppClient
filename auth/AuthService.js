import decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
// import 'url-search-params-polyfill'

export default class AuthService {
  // Init
  constructor(domain) {
    this.domain = domain || 'https://api.narutoccg.com'; // API Server
    // this.domain = domain || 'http://192.168.0.106:3000'; // API Server
    this.fetch = this.fetch.bind(this); // React binding
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  async signup(name, userName, location, email, password) {
    const details = {
        'name' : name,
        'location': location,
        'userName' : userName,
        'email': email,
        'password': password,
    }
    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    return await this.fetch(`${this.domain}/api/v1/users/signup`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody,
    }).then(response => {
      this.setToken(response.token);
      return Promise.resolve(response);
    });
  }

  async login(email, password) {
    // Get a token from api server using the fetch api
    const data = {
      'email': email,
      'password': password
    }
    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    
    return await this.fetch(`${this.domain}/api/v1/users/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody,
    }).then(response => {
      this.setToken(response.token);
      return Promise.resolve(response);
    });
  }

  async addToWantList(_id, amount, value) {
    // const formBody = new URLSearchParams();
    // formBody.append('amount', amount);
    // formBody.append('value', value);
    const data = {
      'value': value,
      'amount': amount
    }
    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    return await this.fetch(`${this.domain}/api/v1/posts/${_id}/want`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: formBody,
    }).then(response => {
      return Promise.resolve(response);
    });
  }

  async loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = await this.getToken(); // GEtting token from localstorage
    return token; // handwaiving here
  }

  async setToken(idToken) {
    // Saves user token to AsyncStorage
    try {
        await AsyncStorage.setItem('id_token', idToken);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
  }

  async getToken() {
    // Retrieves the user token from AsyncStorage
    try {
        return await AsyncStorage.getItem('id_token');
      } catch (error) {
        // Error saving data
        console.log(error);
      }
  }

  async logout() {
    // Clear user token and profile data from AsyncStorage
    try {
        await AsyncStorage.removeItem('id_token');
      } catch (error) {
        // Error saving data
        console.log(error);
      }
  }

   async getProfile() {
    // Using jwt-decode npm package to decode the token
    try {
        const token = await AsyncStorage.getItem('id_token');
        return decode(token);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
  }

   async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Access-Control-Allow-Origin': '*' };

    // Setting Authorization header
    // Authorization: JWT xxxxxxx.xxxxxxxx.xxxxxx
    if (await this.loggedIn()) {
      headers['Authorization'] = await this.getToken();
    }
    // console.log('headers', headers);
    return await fetch(url, {
      headers,
      ...options,
    })
    //   .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }
    const error = response.statusText;
    error.response = response;
    throw error;
  }
}