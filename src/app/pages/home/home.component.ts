import { animate, keyframes, query, state, style, transition, trigger, group, animateChild } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageChangerService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition(':increment, :decrement', [
        animate('2s cubic-bezier(0,1,1,1)', keyframes([
          style({ 
            transform: 'scale(0) translateY(100px)',
            offset: 0.4
           }),
          style({ 
            transform: 'translateY(100px) scale(0)',
            animationTimingFunction: 'cubic-bezier(.16,3,1,1.05)',
            offset: 0.9
          }),
          style({ 
            transform: 'translateY(0) scale(1)',
            offset: 1
          })
        ])),
      ])
    ]),
    trigger('slide', [
      state('1', style({
        transform: 'translateX(-100vw)'
      })),
      state('2', style({
        transform: 'translateX(-200vw)'
      })),
      state('3', style({
        transform: 'translateX(-300vw)'
      })),
      transition(':increment, :decrement', [
        group([
          query('@scale', [ animateChild() ]),
          animate('2s cubic-bezier(.75,0,.25,1)'),
        ]),
      ])
    ]),
    trigger('scale', [
      state('1', style({
        transform: 'scale(1)'
      })),
      state('2', style({
        transform: 'scale(1)'
      })),
      state('3', style({
        transform: 'scale(1)'
      })),
      transition(':increment, :decrement', [
        animate('2s cubic-bezier(1,0,0,1)', keyframes([
          style({ 
            transform: 'scale(0.8)',
            'border-radius': '20px',
            'box-shadow': '0 0 70px -30px black',
            'animation-timing-function': 'cubic-bezier(1,0,1,1)',
            offset: 0.5
           }),
           style({ 
            transform: 'scale(1)',
            'border-radius': 0,
            offset: 1
           }),
        ]))
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public currentPageIndex: number = 0;
  private isDestroyed$ = new Subject();

  constructor(private pageChangerService: PageChangerService) {}

  public ngOnInit(): void {
    this.subscribeToCurrentPage();
  }

  private subscribeToCurrentPage(): void {
    this.pageChangerService.currentPageIndex$.pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe((currentPageIndex) => {
      this.currentPageIndex = currentPageIndex;
    })
  }
  
  public ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
