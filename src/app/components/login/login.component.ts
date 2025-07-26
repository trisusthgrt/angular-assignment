import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API delay
    setTimeout(() => {
      if (this.authService.login(this.loginData.email, this.loginData.password)) {
        const user = this.authService.getCurrentUser();
        if (user?.role === 'admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/posts']);
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
      this.isLoading = false;
    }, 1000);
  }
} 