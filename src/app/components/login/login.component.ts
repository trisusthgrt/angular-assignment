import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage = '';
  isLoading = false;
  availableUsers: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get available users for display
    this.loadAvailableUsers();
  }

  private loadAvailableUsers() {
    // Subscribe to auth service to get users when they're loaded
    this.authService.currentUser$.subscribe(() => {
      // Get users from auth service (this will be populated from dummyjson)
      const users = this.authService.getAllUsers();
      console.log('Available users in component:', users);
      if (users.length > 0) {
        this.availableUsers = users.slice(0, 10); // Show first 10 users
        console.log('Displaying users:', this.availableUsers);
      } else {
        console.log('No users available yet');
      }
    });
  }

  reloadUsers() {
    console.log('Manually reloading users...');
    // Access the reload method from auth service
    (this.authService as any).reloadUsers();
    // Refresh the available users after a short delay
    setTimeout(() => {
      this.loadAvailableUsers();
    }, 2000);
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    console.log('Submitting login with:', this.loginData);

    // Simulate API delay
    setTimeout(() => {
      if (this.authService.login(this.loginData.email, this.loginData.password)) {
        const user = this.authService.getCurrentUser();
        console.log('Login successful, user:', user);
        if (user?.role === 'admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/posts']);
        }
      } else {
        console.log('Login failed');
        this.errorMessage = 'Invalid email or password. Please check the available users below.';
      }
      this.isLoading = false;
    }, 1000);
  }
} 