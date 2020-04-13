import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from "../../environments/environment";

interface AuthResponseData {
  idToken :	string;
  email	: string;
  refreshToken : string;
  expiresIn	: string;
  localId :	string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey = environment.firebaseApiKey;
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apiKey;
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey;
  private tokenExpirationTimer : any;

  user = new BehaviorSubject<User>(null);

  constructor(private http : HttpClient) { }

  signUp(email : string, password : string) : Observable<AuthResponseData>{
    return this.sendAuthRequest(email, password, this.signUpUrl);
  }

  signIn(email : string, password : string) : Observable<AuthResponseData>{
    return this.sendAuthRequest(email, password, this.signInUrl)
  }

  sendAuthRequest(email : string, password : string, url : string){
    return this.http.post<AuthResponseData>(
      url,
      {
        'email' : email,
        'password' : password,
        'returnSecureToken' : true
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An Error Occurred!';
      if(errorResponse.error && errorResponse.error.error){
        errorMessage = errorResponse.error.error.message;
      }
      return throwError(errorMessage);
      }), tap((responseData : AuthResponseData) => {
        const expiryDate = new Date(new Date().getTime() + +responseData.expiresIn*1000);
        const user = new User(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          expiryDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    )
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    clearTimeout(this.tokenExpirationTimer);
  }

  autoLogin(){
    const userData : {
      email : string,
      userId : string,
      _token : string,
      _expirationDate : string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email,
      userData.userId,
      userData._token,
      new Date(userData._expirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationTime : number){
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationTime)
  }
}
