import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ 
          opacity: 0,
         }),
        animate('2s ease-in', style({
          opacity: 100
        }))
      ])
    ]),
    trigger('glowAnimation', [
      transition(':enter', [
        style({ 
          boxShadow: '0 0 40px 20px #fff, 0 0 40px 20px #f05526, 0 0 40px 20px #DD0031',
          opacity: 0
         }),
        animate('4s 2s ease-out', style({
          boxShadow: '0 0 70px 30px #fff, 0 0 70px 60px #f05526, 0 0 200px 60px #DD0031',
          opacity: 0.8
        }))
      ])
    ])
  ]
})
export class PresentationComponent {
}
