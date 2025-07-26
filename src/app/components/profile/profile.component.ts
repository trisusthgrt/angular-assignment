import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  profileData: Partial<User> = {};
  originalData: Partial<User> = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProfileData();
  }

  loadProfileData() {
    this.profileData = { ...this.currentUser };
    this.originalData = { ...this.currentUser };
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.profileData = { ...this.originalData };
    this.isEditing = false;
  }

  saveProfile() {
    if (this.currentUser && this.profileData) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.profileData
      };
      
      if (this.authService.updateUser(updatedUser)) {
        this.currentUser = updatedUser;
        this.originalData = { ...updatedUser };
        this.isEditing = false;
        alert('Profile updated successfully!');
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    if (this.currentUser?.role === 'admin') {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/posts']);
    }
  }
} 