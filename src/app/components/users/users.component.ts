import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RoleDirective } from '../../directives/role.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RoleDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Guard ensures user is admin, so we can safely get current user
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      if (this.authService.deleteUser(userId)) {
        this.loadUsers();
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getAdminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  getUserCount(): number {
    return this.users.filter(u => u.role === 'user').length;
  }
} 