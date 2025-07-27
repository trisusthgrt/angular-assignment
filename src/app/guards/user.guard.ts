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
    if (this.authService.isLoggedIn() && this.authService.isUser()) {
      return true;
    } else {
      // Redirect to appropriate page based on user status
      if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
        this.router.navigate(['/users']); // Admins go to users
      } else {
        this.router.navigate(['/login']); // Not logged in go to login
      }
      return false;
    }
  }
} 