import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

let {API_URL} = require('app-config');

let options = new RequestOptions({
  headers: new Headers({ 'Content-Type': 'application/json' })
});

@Injectable()
export class AuthenticationService {
  constructor(private _http: Http) {}

  private apiTokenSource = new BehaviorSubject<string>("");
  apiToken$ = this.apiTokenSource.asObservable();

  private objectIsEmpty(obj: any): boolean {
    for (let x in obj) { return false; }
    return true;
  }

  register(user: string, password: string): Promise<any> {
    let userInformation = {
      user: user,
      password: password,
      role: 'admin'
    };
    let body = JSON.stringify(userInformation);
    return this._http.post("${API_URL}/api/auth/register", body, options)
      .toPromise()
      .then(response => {
        let responseData = response.json().data;
        let noError = this.objectIsEmpty(responseData._error);
        if (noError && responseData._data) {
          return responseData._data;
        }
        else {
          throw Error(responseData._error);
        }
      })
  }

  login(user: string, password: string): Promise<any> {
    let loginInformation = {
      user: user,
      password: password
    };
    let body = JSON.stringify(loginInformation);
    return this._http.post("${API_URL}/api/auth/login", body, options)
      .toPromise()
      .then(response => {
        let responseData = response.json().data;
        let noError = this.objectIsEmpty(responseData._error);
        if (noError && responseData._data) {
          this.apiTokenSource.next(responseData._data.token);
          return responseData._data.token;
        }
        else {
          throw Error(responseData._error);
        }
      })
  }
}
