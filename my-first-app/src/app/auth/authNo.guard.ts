import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthNoGuardService implements CanActivate {
    constructor(
        private as: AuthService,
        private router: Router
    ) {}
    canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.as.userSubject
            .pipe(
                take(1),
                map(user => {
                    const isAuth = !!user;
                    if (!isAuth) {
                        return true;
                    }
                    else {
                        return this.router.createUrlTree(['/recipes']);
                    }
                })
            )
    }
}