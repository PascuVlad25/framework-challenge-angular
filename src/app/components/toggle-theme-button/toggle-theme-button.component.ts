import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { Theme } from 'src/app/services/enums';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toggle-theme-button',
  templateUrl: './toggle-theme-button.component.html',
  styleUrls: ['./toggle-theme-button.component.scss']
})
export class ToggleThemeButtonComponent implements OnInit, OnDestroy {
  public currentThemeIcon: IconDefinition = faSun;
  public iconClass = 'sun';

  private isDestroyed$: Subject<void> = new Subject();

  constructor(private themeService: ThemeService) { }

  public ngOnInit(): void {
    this.subscribeToTheme();
  }
  
  public toggleMode(): void {
    this.themeService.toggleTheme();
  }

  private subscribeToTheme(): void {
    this.themeService.currentTheme$.pipe(
      takeUntil(this.isDestroyed$)
      ).subscribe((currentTheme) => {
      this.currentThemeIcon = currentTheme === Theme.Light ? faSun : faMoon;
      this.iconClass = currentTheme === Theme.Light ? 'sun' : 'moon';
    });
  }

  public ngOnDestroy(): void {
    this.isDestroyed$.next();
  }
}
