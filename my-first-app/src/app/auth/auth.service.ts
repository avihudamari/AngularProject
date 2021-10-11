import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    firbaseAPIKey = "AIzaSyDUdYT-N99xrqGHfijW957qPWP7MEWhYrM";
    
    constructor(private http:HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.firbaseAPIKey,
            {
                email : email,
                password: password,
                returnSecureToken: true
            },
        );
    }
}
