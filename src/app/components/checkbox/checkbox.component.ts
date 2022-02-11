import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() color?: string = 'gradient-1';
  @Input() isCompleted: boolean = false;
  @Output() isCompletedChange = new EventEmitter<boolean>();

  public checkIcon = faCheck;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.isCompleted = !this.isCompleted;
    this.isCompletedChange.emit(this.isCompleted);
  }

  public getStyleClasses(): string {
    if(!this.isCompleted) {
      return '';
    }
    return `checked gradients ${this.color}`;
  }
}
