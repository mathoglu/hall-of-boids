import {Component, Input} from '@angular/core';

@Component({
    selector: 'skill',
    template: require('./skill.html'),
    styles: [require('./skill.scss')]
})

export class SkillComponent {
  @Input() content;
  @Input() size;
}
