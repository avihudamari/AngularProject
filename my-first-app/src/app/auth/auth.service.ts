import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from '../../environments/environment';

interface AuthResponse {
    email: string,
    idToken: string,
    localId: string,
    expiresIn: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(
        private http: HttpClient,
        private router: Router) {}

    userSubject = new BehaviorSubject<User>(null);
    expiretionTimer = null;

    sign(mode: string, email: string, password: string) {
        return this.http
        .post<AuthResponse>(
            mode == 'up' ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey :
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email : email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(errorRes => {
                let errorObject: {
                    code: string,
                    message: string
                };
                let errorMessage;

                if (!errorRes.error || !errorRes.error.error) {
                    errorObject = {
                        code: 'no code detected',
                        message: 'unknown error'
                    };
                    return throwError(errorObject);
                }

                switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'this email exists already!';
                    break;
                case 'INVALID_EMAIL':
                    errorMessage = 'this email is invaild';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'incorrect password';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'this email not found, please sign up first';
                    break;
                default:
                    errorMessage = 'unknown error';
                }

                errorObject = {
                    code: errorRes.error.error.code,
                    message: errorMessage
                };
                return throwError(errorObject);
            }),
            tap(resData => {
                const expiretionTime = new Date(new Date().getTime() + 1000 * +resData.expiresIn);
                const user = new User(
                    resData.email,
                    resData.idToken,
                    resData.localId,
                    expiretionTime,
                    mode == 'up' ? true : false
                );
                this.userSubject.next(user);
                this.autoLogout(+resData.expiresIn * 1000);
                localStorage.setItem('userData', JSON.stringify(user));
            })
        );    
    }

    autoSignIn() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const user = new User(
                userData.email,
                userData._idToken,
                userData.loaclId,
                new Date(userData._expiredTime),
                false
            );
            
            if (user.idToken) {
                this.userSubject.next(user);
                let expiretionRemindTime = new Date(userData._expiredTime).getTime() - new Date().getTime();
                this.autoLogout(expiretionRemindTime);
            }
        }    
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('userData');

        if (this.expiretionTimer) {
            clearTimeout(this.expiretionTimer);
        }
        this.expiretionTimer = null;
    }

    autoLogout(expiretionTime: number) {
        this.expiretionTimer = setTimeout(() => {
            this.logout();
        }, expiretionTime);
    }
}
