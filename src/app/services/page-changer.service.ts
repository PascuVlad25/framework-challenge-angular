import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageChangerService {
  public currentPageIndex$ = new BehaviorSubject<number>(0);
  private maxPage = 3;

  constructor() { }
  
  public isAvailableNext(): boolean {
    return this.currentPageIndex$.value < this.maxPage;
  }

  public isAvailablePrevious(): boolean {
    return this.currentPageIndex$.value > 0;
  }

  public nextPage(): void {
    if(this.isAvailableNext()) {
      const newValue = this.currentPageIndex$.value + 1;
      this.currentPageIndex$.next(newValue);
    }
  }

  public previousPage(): void {
    if(this.isAvailablePrevious()) {      
      const newValue = this.currentPageIndex$.value - 1;
      this.currentPageIndex$.next(newValue);
    }
  }
}
