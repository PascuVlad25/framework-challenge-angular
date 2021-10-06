import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ 
          opacity: 0,
          transform: 'translateY(50px)'
         }),
        animate('4s ease-out', style({
          transform: 'translateY(-15px)',
          opacity: 100
        }))
      ], { params: {delay: 100} })
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        style({ 
          opacity: 0,
         }),
        animate('2s {{delay}}ms ease-out', style({
          opacity: 100
        }))
      ], { params: {delay: 1} } )
    ])
  ]
})
export class LogoComponent {
  private frameworkName = 'Angular';

  public getFrameworkNameLetters(): string[] {
    return [...this.frameworkName];
  }

  public getDelayTime(index: number): any {
    const delay = index * 200;
    return {
      value: '',
      params: { delay }
  };
  }
}
