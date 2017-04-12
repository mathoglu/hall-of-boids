import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

let {API_URL} = require('app-config');

let options = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' })
  });

@Injectable()
export class CardService {

  cards: any[] = [];
  fetched: boolean = false;
  ids: number[] = [];

  constructor(private _http: Http) {}

  _fetchCards(): Promise<any> {
    return this._http.get(`${API_URL}/api/cards`, options)
      .toPromise()
      .then((res)=> {
        const body = res.json();
        this.fetched = true;
        this.cards = body._data;
        this.ids = body._data.map((card) => card.id).sort((a, b) => a-b);
        return body._data;
      })
  }

  getNextCardId(id: number): number {
    let idsGreaterThanId = this.ids.filter(n => n > id);
    if (idsGreaterThanId.length > 0) {
      return idsGreaterThanId[0];
    }
    else {
      return this.ids[0];
    }
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

  _fetchIds(): Promise<number[]> {
    let requestOptions = options;
    options.search = new URLSearchParams();
    options.search.set('onlyIds', 'true');
    return this._http.get(`${API_URL}/api/cards/`, requestOptions)
      .toPromise()
      .then((res) => {
        const body = res.json();
        this.ids = body._data.sort((a, b) => a - b);
        return body._data.sort((a,b) => a - b);
      })
  }

  listIds(): Promise<number[]> {
    return this._fetchIds();
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
