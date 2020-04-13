import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  error : string = '';
  authObservable : Observable<any>;

  constructor(private authService : AuthService, private router : Router) { }
  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm : NgForm){
    this.isLoading = true;
    console.log(authForm.value)
    if(this.isLoginMode){
      this.authObservable = this.authService.signIn(
        authForm.value['email'],
        authForm.value['password']
      )
    }else{
      this.authObservable = this.authService.signUp(
        authForm.value['email'],
        authForm.value['password']
      )
    }
    this.authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    },errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
    authForm.reset()
  }

  onHandleError(){
    this.error=null;
  }

}
