import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // If user is already logged in and has access token, redirect to appropriate page
    if (this.authService.isLoggedIn() && this.authService.getAccessToken()) {
      console.log('LoginGuard: User already logged in, redirecting to appropriate page');
      if (this.authService.isAdmin()) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/posts']);
      }
      return false;
    }
    console.log('LoginGuard: User not logged in, allowing access to login page');
    return true;
  }
} 