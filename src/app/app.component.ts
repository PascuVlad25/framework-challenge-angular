import { Component } from '@angular/core';
import { Theme } from './services/enums';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';

  constructor(private themeService: ThemeService){
    this.themeService.init();
  }
}
