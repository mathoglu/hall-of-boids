import {Component, Input, OnInit} from 'angular2/core';
import {SkillComponent} from '../skill/skill';

@Component({
    selector: 'card',
    template: require('./card.html'),
    styles: [require('./card.scss')],
    directives: [SkillComponent]
})

export class CardComponent {

  @Input() data;
  active: boolean = false;
  topAmount: number;

  ngOnInit(): void {
    this.data.projects.forEach(function(p) {
      p.duration.from = new Date(p.duration.from);
      p.duration.to = new Date(p.duration.to);
    })
  }

  public getTop(nr: number): Array<any> {
    this.topAmount = nr;
    return this.data.skills.slice(0,nr);
  }

  public getRest(): Array<any> {
    return this.data.skills.slice(this.topAmount, this.data.skills.length);
  }

  public toggle(e: Event): void {
    this.active = !this.active;
  }
}
