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
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    } else {
      // Redirect to appropriate page based on user status
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/posts']); // Regular users go to posts
      } else {
        this.router.navigate(['/login']); // Not logged in go to login
      }
      return false;
    }
  }
} 