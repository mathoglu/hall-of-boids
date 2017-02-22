import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

let {API_URL} = require('app-config');

let options = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' })
  });

@Injectable()
export class CardService {

  cards: any[] = [];
  fetched: boolean = false;

  constructor(private _http: Http) {}

  _fetchCards(): Promise<any> {
    return this._http.get(`${API_URL}/api/cards`, options)
      .toPromise()
      .then((res)=> {
        const body = res.json();
        this.fetched = true;
        this.cards = body._data;
        return body._data;
      })
  }

  _isFetched(id): boolean {
    return !!this.cards.filter( (c): boolean => { return parseInt(c.id) === id } ).length
  }

  _fetchCard(id: number): Promise<any> {
    return this._http.get(`${API_URL}/api/cards/${id}`, options)
      .toPromise()
      .then((res)=> {
        const body = res.json();
        if(!body._data.length) return;
        this.fetched = true;
        this.cards.push(body._data[0]);
        return body._data[0];
      })
  }

  _getFetched(id: number): Promise<any> {
    return Promise.resolve(this.cards.filter( (c): boolean => { return parseInt(c.id) == id } )[0]);
  }

  list(): Promise<any>  {
    return this._fetchCards()
  }

  get(id: number): Promise<any> {
    if(this._isFetched(id)) {
      return this._getFetched(id)
    }
    return this._fetchCard(id);
  }

  next(id: number): boolean {
    return this.cards && id+1 <= this.cards.length
  }

  prev(id: number): boolean {
    return this.cards && id-1 > 0
  }
}
