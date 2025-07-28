import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if user is logged in, has access token, and is regular user
    if (this.authService.isLoggedIn() && this.authService.getAccessToken() && this.authService.isUser()) {
      console.log('UserGuard: User is authenticated, has access token, and is regular user');
      return true;
    } else {
      console.log('UserGuard: Access denied - checking user status...');
      // Redirect to appropriate page based on user status
      if (this.authService.isLoggedIn() && this.authService.getAccessToken() && this.authService.isAdmin()) {
        console.log('UserGuard: User is logged in but is admin, redirecting to users');
        this.router.navigate(['/users']); // Admins go to users
      } else {
        console.log('UserGuard: User not authenticated or missing access token, redirecting to login');
        this.router.navigate(['/login']); // Not logged in go to login
      }
      return false;
    }
  }
} 