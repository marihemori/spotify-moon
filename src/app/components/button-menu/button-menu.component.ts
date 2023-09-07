import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss'],
})
export class ButtonMenuComponent implements OnInit {
  @Input()
  description = 'Button';

  @Input()
  selected = false;

  @Output()
  click = new EventEmitter<void>();

  ngOnInit(): void {}

  onClick() {
    this.click.emit();
  }
}
