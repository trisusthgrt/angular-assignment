import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if user is logged in and has valid access token
    if (this.authService.isLoggedIn() && this.authService.getAccessToken()) {
      console.log('AuthGuard: User is authenticated and has access token');
      return true;
    } else {
      console.log('AuthGuard: User not authenticated or missing access token, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
} 