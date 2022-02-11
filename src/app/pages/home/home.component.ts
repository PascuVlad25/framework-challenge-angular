import { animate, keyframes, query, state, style, transition, trigger, group, animateChild } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeAnimation, pagesAnimations } from 'src/app/animations';
import { PageChangerService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    pagesAnimations,
    fadeAnimation,
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public currentPageIndex: number = 0;
  private isDestroyed$ = new Subject();
  private pages = ['home', 'todo', 'game', 'animations'];

  constructor(private pageChangerService: PageChangerService, private router: Router) {}

  public ngOnInit(): void {
    this.subscribeToCurrentPage();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  private subscribeToCurrentPage(): void {
    this.pageChangerService.currentPageIndex$.pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe((currentPageIndex) => {
      this.currentPageIndex = currentPageIndex;
      const pageUrl = this.pages[this.currentPageIndex];
      this.router.navigate([pageUrl]);
    })
  }
  
  public ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
