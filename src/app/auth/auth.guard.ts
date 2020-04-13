import { CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService : AuthService,
              private router : Router){}

  canActivate(activatedRoute : ActivatedRouteSnapshot,
              state : RouterStateSnapshot) :  boolean |
                                              Promise<boolean | UrlTree> |
                                              Observable<boolean | UrlTree> |
                                              UrlTree{
      return this.authService.user.pipe(
        take(1),
        map(user => {
          if(!!user){
            return true;
          }else{
            return this.router.createUrlTree(['/auth']);
          }
        })
      )
  }
}
