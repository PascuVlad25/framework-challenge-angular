import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSmileWink, faGrinStars, faLaughBeam, faGrinHearts, faGrinTongue, faDizzy } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from 'src/app/services';
import { Theme } from 'src/app/services/enums';

@Component({
  selector: 'app-animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.scss']
})
export class AnimationDemoComponent implements OnInit, OnDestroy {
  public winkEmoji = faSmileWink;
  public starsEmoji = faGrinStars;
  public laughEmoji = faLaughBeam;
  public heartEmoji = faGrinHearts;
  public tongueEmoji = faGrinTongue;
  public dizzyEmoji = faDizzy;

  public isDark = false;
  private isDestroyed$: Subject<void> = new Subject<void>();

  constructor(private themeService: ThemeService) { }

  public ngOnInit(): void {
    this.subscribeToTheme();
  }

  private subscribeToTheme(): void {
    this.themeService.currentTheme$.pipe(
      takeUntil(this.isDestroyed$)
      ).subscribe((theme) => {
      this.isDark = theme === Theme.Dark;
    });
  }

  public ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
