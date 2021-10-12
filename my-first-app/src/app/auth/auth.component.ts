import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private as: AuthService,
    private router: Router) { }

  SignUpMode = false;
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
      this.as.sign('up', email, password)
      .subscribe(
        res => {
          // console.log(res);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorObject => {         
          this.errorObject = errorObject;
          this.isLoading = false;
        }
      );
    }
    else {
      this.as.sign('in', email, password)
      .subscribe(
        res => {
          // console.log(res);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorObject => {
          // console.log(errorObject);       
          this.errorObject = errorObject;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
