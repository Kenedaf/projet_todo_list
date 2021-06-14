import { Component, OnInit, Input,OnDestroy, ViewChild, ElementRef } from '@angular/core';

import {FormControl} from '@angular/forms';
import {from, Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { User } from './user';
import { StateService } from './state.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{

  @ViewChild('htmlData') htmlData:ElementRef;
  public mode: string;
  public part: number;
  public partString: string;
  public isAuth: boolean;

  private modeSub: Subscription;
  private partSub: Subscription;
  private isAuthSub: Subscription;
  public location = '' ;
  user_email:any
  email1: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(

   private state: StateService,
              private auth: AuthService,
              public router: Router,
              private authService: AuthService,
              private authService1: AuthService,
              private _username: LoginComponent,
              private authenticationService: AuthService,

  
 ){
  this.authService.currentUser.subscribe(x => this.currentUser = x);
  this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    this.currentUser = user;
});
 }
  ngOnInit(){
   // this.reloadData()
    this.user_email=this.authService1.currentUserValue;
    }
  
 ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.currentUserSubscription.unsubscribe();
  this.modeSub.unsubscribe();
  this.partSub.unsubscribe();
  this.isAuthSub.unsubscribe();
}
 
    onLogout() {
      this.authService.logout();
      this.router.navigate([ '/auth/login']);
    }
  
    onBackToParts() {
      this.router.navigate(['/default']);
    }
}