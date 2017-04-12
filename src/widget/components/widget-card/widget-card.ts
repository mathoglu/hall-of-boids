import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'widget-card',
    template: require('./widget-card.html'),
    styles: [require('./widget-card.scss')]
})

export class WidgetCardComponent implements OnInit {

  @Input() data;
  topAmount: number;

  constructor(
    private _sanitizer: DomSanitizer
  ) {}

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
    return this.data.projects[0];
  }

  private getSafeImage() {
    return this._sanitizer.bypassSecurityTrustUrl(this.data.image);
  }
}
