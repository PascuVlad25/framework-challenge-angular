import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GameService } from "../services";
import { GameComponent } from "./game";
import { GameSectionComponent } from "./game-section";
import { LogoComponent } from "./logo";
import { PresentationComponent } from "./presentation";
import { DotsComponent } from './dots/dots.component';
import { TodoComponent } from './todo/todo.component';
import { TodoGroupComponent } from './todo-group/todo-group.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { AnimationDemoComponent } from './animation-demo/animation-demo.component';
import { SliderComponent } from './slider/slider.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToggleThemeButtonComponent } from './toggle-theme-button/toggle-theme-button.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      PresentationComponent,
      GameSectionComponent,
      GameComponent,
      LogoComponent,
      DotsComponent,
      TodoComponent,
      TodoGroupComponent,
      TodoCardComponent,
      AnimationDemoComponent,
      SliderComponent,
      ToggleThemeButtonComponent,
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      FormsModule
    ],
    exports: [
      PresentationComponent,
      GameSectionComponent,
      TodoComponent,
      AnimationDemoComponent,
      SliderComponent
    ],
    providers: [GameService]
  })
  export class ComponentsModule { }