import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if user is logged in, has access token, and is admin
    if (this.authService.isLoggedIn() && this.authService.getAccessToken() && this.authService.isAdmin()) {
      console.log('AdminGuard: User is authenticated, has access token, and is admin');
      return true;
    } else {
      console.log('AdminGuard: Access denied - checking user status...');
      // Redirect to appropriate page based on user status
      if (this.authService.isLoggedIn() && this.authService.getAccessToken()) {
        console.log('AdminGuard: User is logged in but not admin, redirecting to posts');
        this.router.navigate(['/posts']); // Regular users go to posts
      } else {
        console.log('AdminGuard: User not authenticated or missing access token, redirecting to login');
        this.router.navigate(['/login']); // Not logged in go to login
      }
      return false;
    }
  }
} 