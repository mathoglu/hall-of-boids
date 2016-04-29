import {Component, Input} from 'angular2/core';

@Component({
    selector: 'skill',
    template: require('./skill.html'),
    styles: [require('./skill.scss')]
})

export class SkillComponent {
  @Input() content;
}
