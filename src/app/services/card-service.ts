import {Injectable} from 'angular2/core';

@Injectable()
export class CardService {

  cards: any[];
  fetched: boolean = false;

  _fetchCards(): Promise<any> {
    return cardsPromise.then((cards)=> {
      this.fetched = true;
      this.cards = cards._data;
      return this.cards;
    });
  }

  _fetchCard(id: number): Promise<any> {
    let card = cards._data.filter( (a): boolean => { return parseInt(a.id) == id });
    if(!card.length) return Promise.reject({message: 'Card not found'})
    return Promise.resolve(card[0]);
  }

  _getFetched(id: number): boolean|Object {
    let card = cards._data.filter( (c): boolean => { return parseInt(c.id) == id } );
    if(!!card.length) return false;
    return card[0];
  }

  list(): Promise<any>  {
    if(!this.fetched) {
      return this._fetchCards()
    }
    return cardsPromise;
  }

  get(id: number): Promise<any> {
    let card = this._getFetched(id)
    if(!card) {
      return this._fetchCards().then(()=> {
        return this.cards.filter( (c): boolean => { return parseInt(c.id) == id } )[0]
      });
    }
    return Promise.resolve(card)
  }

  next(id: number): boolean {
    return this.cards && id+1 <= this.cards.length
  }

  prev(id: number): boolean {
    return this.cards && id-1 > 0
  }
}

let cards = require('../cards.json'),
    cardsPromise = Promise.resolve(cards);
