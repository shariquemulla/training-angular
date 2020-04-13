import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authSubscription : Subscription;

  constructor(
    private dataService : DataStorageService,
    private authService : AuthService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  onSaveData(){
    this.dataService.storeRecipes();
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
