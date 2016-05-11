import {Component, Input, OnInit} from 'angular2/core';
import {SkillComponent} from '../../../app/components/skill/skill';

@Component({
    selector: 'widget-card',
    template: require('./widget-card.html'),
    styles: [require('./widget-card.scss')],
    directives: [SkillComponent]
})

export class WidgetCardComponent implements OnInit {

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

  public getLastProject(): Array<any> {
    return this.data.projects.slice(0, 1);
  }

  public toggle(e: Event): void {
    this.active = !this.active;
  }
}
