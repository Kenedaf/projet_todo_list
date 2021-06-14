import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {path: 'auth/login', component:LoginComponent },
  {path:'signup', component:SignupComponent},
{path:'todo_list',component: TodoListComponent, canActivate: [AuthGuard]},
{path: '', pathMatch: 'full', redirectTo: 'auth/login' },

];

@NgModule({
 /* imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y] - adjust scroll offset
    }),
  //  RouterModule.forChild(routes),
  ],*/
  imports: [
    RouterModule.forRoot(routes)
],

  exports: [RouterModule],
 

})
export class AppRoutingModule { }
