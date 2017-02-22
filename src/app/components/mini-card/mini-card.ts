import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'mini-card',
    template: require('./mini-card.html'),
    styles: [require('./mini-card.scss')]
})
export class MiniCardComponent  {
  @Input() data;

  constructor(
    private router:Router,
    private sanitizer: DomSanitizer){}

  public viewCard(): void {
    this.router.navigate(['/card', this.data.id] )
  }

  private getSafeImage() {
    return this.sanitizer.bypassSecurityTrustUrl(this.data.image);
  }
}
