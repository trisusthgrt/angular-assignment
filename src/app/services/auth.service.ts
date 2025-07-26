import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users data
  private users: User[] = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      gender: "female",
      age: 28,
      dob: "1996-02-14",
      phone: "555-1234",
      email: "alice.johnson@example.com",
      role: "admin",
      password: "admin123"
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      gender: "male",
      age: 32,
      dob: "1992-07-08",
      phone: "555-5678",
      email: "bob.smith@example.com",
      role: "user",
      password: "user123"
    },
    {
      id: 3,
      firstName: "Carol",
      lastName: "Williams",
      gender: "female",
      age: 25,
      dob: "1999-11-23",
      phone: "555-9012",
      email: "carol.williams@example.com",
      role: "user",
      password: "user456"
    }
  ];

  constructor() {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isUser(): boolean {
    return this.currentUserSubject.value?.role === 'user';
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  deleteUser(userId: number): boolean {
    const index = this.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  addUser(user: Omit<User, 'id'>): User {
    const newId = Math.max(...this.users.map(u => u.id)) + 1;
    const newUser: User = { ...user, id: newId };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(user: User): boolean {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      // Update current user if it's the same user
      if (this.currentUserSubject.value?.id === user.id) {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  }
} 