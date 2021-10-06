import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss']
})
export class DotsComponent implements OnInit {
  @Input() noOfDots: number = 10;
  public matrix: string[][] = [];

  constructor() { }

  ngOnInit(): void {
    for(let i=0; i < this.noOfDots; i++) {
      const line = [];
      for(let j=0; j < this.noOfDots; j++) {
        line.push('.');
      }
      this.matrix.push(line);
    }
  }

}
