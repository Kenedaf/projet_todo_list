import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StateService } from '../state.service';
import { CustomValidators } from 'ngx-custom-validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message:string
  action: string
  signupForm: FormGroup;
  submitted= false
  loading = false;
  errorMessage: string;
  matcher = new MyErrorStateMatcher();
/*
  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }
*/
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService,
              private _snackBar: MatSnackBar) { 
             
              }
              horizontalPosition: MatSnackBarHorizontalPosition = 'center';
              verticalPosition: MatSnackBarVerticalPosition = 'bottom';
            
            
              openSnackBar() {
                this._snackBar.open('Création d utilisateur!!', 'Effectuer avec succées', {
                  duration: 5000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      username:[null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirm_password: ['']
    }, { validator: this.checkPasswords });
    
  }
    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get myForm()
  {
    return this.signupForm.controls;
  }
  onSignup() {
    this.loading = true;
    this.submitted = true;
    if (!this.signupForm.valid) {
      return false;
    } else {

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const username = this.signupForm.get('username').value;
    this.auth.createNewUser(email, password, username).then(
      () => {
        this.loading = false;
        this.openSnackBar()
          this.router.navigate(['/auth/login']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
}
