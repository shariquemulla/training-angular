import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService : AuthService){}

  ngOnInit(){
    this.authService.autoLogin();
    this.authService.user.subscribe(
      user => {
        if(!!user){
          const expirationTime = user._expirationDate.getTime() - new Date().getTime();
          this.authService.autoLogout(expirationTime);
        }
      }
    )
  }
}
