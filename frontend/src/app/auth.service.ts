import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  isAuth$ = new BehaviorSubject<any>(null); 
  user$ = new BehaviorSubject<any>(null); 
  user = new BehaviorSubject<any>(null); 
  token: string;
  userId: string;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  createNewUser(email: string, password: string, username: string) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(
        'http://0.0.0.0:8000/api-token-register/',
        { email: email, password: password, username: username })
        .subscribe(
          () => {
            this.logIn(username, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  login(username: string, password: string) {
    return this.http.post<any>(
    'http://0.0.0.0:8000/api-token-auth/',
    {username, password})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
}
  logIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://0.0.0.0:8000/api-token-auth/',
        { username: username, password: password })
        .subscribe(
          (authData: { token: string, userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.user$.next(authData);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logkout() {
    this.user.next(false);
    this.userId = null;
    this.token = null;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }
}
