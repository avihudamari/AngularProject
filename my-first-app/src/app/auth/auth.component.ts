import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private as: AuthService) { }

  SignUpMode = true;
  isLoading = false;
  errorObject: {
    code: string,
    message: string
  };

  ngOnInit(): void {
  }

  onSwitch() {
    this.SignUpMode = !this.SignUpMode; 
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.SignUpMode) {
      this.as.signup(email, password)
      .subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
        },
        error => {
          let errorMessage;

          switch(error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'this email exists already!' 
          }

          this.errorObject = {
            code: error.error.error.code,
            message: errorMessage
          } ;

          this.isLoading = false;
        }
      );
    }
    else {
      //...
      this.isLoading = false;
    }

    form.reset();
  }

}
