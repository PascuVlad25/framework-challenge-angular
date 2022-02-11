import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSectionComponent, PresentationComponent } from 'src/app/components';
import { AnimationDemoComponent } from 'src/app/components/animation-demo/animation-demo.component';
import { TodoComponent } from 'src/app/components/todo/todo.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: PresentationComponent, 
        data: { animation: 'HomePage' }
      },
      {
        path: 'todo',
        component: TodoComponent, 
        data: { animation: 'TodoPage' }
      },
      {
        path: 'game',
        component: GameSectionComponent, 
        data: { animation: 'GamePage' }
      },
      {
        path: 'animations',
        component: AnimationDemoComponent, 
        data: { animation: 'AnimationsPage' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
