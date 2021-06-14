import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { StateService } from '../state.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  loginForm: FormGroup;
  loading = false;
  errorMessage: string;
  user_email:any
  email1:any
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private authService1: AuthService,
              private userService : UserService,
              private state: StateService,
              private _snackBar: MatSnackBar
              )
              {
             
              }
              horizontalPosition: MatSnackBarHorizontalPosition = 'center';
              verticalPosition: MatSnackBarVerticalPosition = 'top';
              openSnackBar() {
                let config = new MatSnackBarConfig();
                this._snackBar.open('Nom d utilisateur ou mot de passe incorrecte','', {
                  duration: 5000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
  ngOnInit() {
    this.state.mode$.next('form');
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onLogin() {

    this.loading = true;
    this.auth.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/todo_list']);
            },
            error => {
                
                this.loading = false;
                this.errorMessage = error.message;
                this.openSnackBar()
            });
}






}
