import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../../common/services/card-service';
import {Router} from "@angular/router";
import {CardDataService} from "../../../common/services/card-data-service";

@Component({
    selector: 'edit-view',
    template: require('./edit.html'),
    //styles: [require('./edit-employee.scss')],
})
export class EditView {
  @Input() content;
  cards: any[];
  employees: any[];
  loading: boolean = true;

  constructor(
    private _router: Router,
    private _cardService: CardService,
    private _cardDataService: CardDataService
  ) {}

  ngOnInit() {
    this._cardService.list().then(
      (cards)=> {
        this.cards = cards;
      }
    );
    this._cardDataService.getEmployees().then(cardData => {
      console.log(cardData);
      this.employees = cardData;
      this.loading = false;
    });
  }

  navigateToEmployeeEdit(id: number) {
    this._router.navigate(['/edit', id]);
  }

}
