import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private users: User[] = [];
  private usersLoaded = false;
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem(this.USER_KEY);
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    
    if (storedUser && accessToken) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    } else {
      // Clear any partial data if token is missing
      this.clearStoredData();
    }
    
    // Load users from dummyjson on service initialization
    this.loadUsersFromDummyJson();
  }

  private loadUsersFromDummyJson(): void {
    console.log('Loading users from dummyjson...');
    this.http.get<any>('https://dummyjson.com/users')
      .pipe(
        map(response => {
          console.log('Raw dummyjson response:', response);
          // Transform dummyjson user data to match our User interface
          const transformedUsers = response.users.map((user: any) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            age: user.age,
            dob: user.birthDate, // dummyjson uses birthDate
            phone: user.phone,
            email: user.email,
            role: user.id <= 3 ? 'admin' : 'user', // First 3 users as admin for demo
            password: 'password123' // Default password for all users
          }));
          console.log('Transformed users:', transformedUsers);
          return transformedUsers;
        }),
        catchError(error => {
          console.error('Error loading users from dummyjson:', error);
          // Fallback to mock data if API fails
          return of(this.getMockUsers());
        })
      )
      .subscribe(users => {
        this.users = users;
        this.usersLoaded = true;
        console.log('Users loaded from dummyjson:', users);
        console.log('Users loaded flag set to:', this.usersLoaded);
      });
  }

  // Method to manually reload users (for debugging)
  reloadUsers(): void {
    this.usersLoaded = false;
    this.loadUsersFromDummyJson();
  }

  private getMockUsers(): User[] {
    return [
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
  }

  login(email: string, password: string): boolean {
    console.log('Login attempt:', email, password);
    console.log('Users loaded:', this.usersLoaded);
    console.log('Available users:', this.users.length);
    
    // Wait for users to be loaded if not already loaded
    if (!this.usersLoaded) {
      console.log('Users not loaded yet, using mock data for login');
      const mockUsers = this.getMockUsers();
      console.log('Mock users:', mockUsers.map(u => ({ email: u.email, password: u.password })));
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        console.log('Login successful with mock user:', user);
        this.setUserSession(user);
        return true;
      }
      console.log('Login failed with mock users');
      return false;
    }

    console.log('Using dummyjson users for login');
    console.log('Available dummyjson users:', this.users.map(u => ({ email: u.email, password: u.password })));
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful with dummyjson user:', user);
      this.setUserSession(user);
      return true;
    }
    console.log('Login failed with dummyjson users');
    return false;
  }

  private setUserSession(user: User): void {
    // Generate a simple access token (in real app, this would come from server)
    const accessToken = this.generateAccessToken(user);
    
    // Store user and token
    this.currentUserSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  private generateAccessToken(user: User): string {
    // Simple token generation for demo purposes
    // In a real application, this would be handled by the server
    const tokenData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
    };
    return btoa(JSON.stringify(tokenData));
  }

  private isTokenExpired(token: string): boolean {
    try {
      const tokenData = JSON.parse(atob(token));
      const currentTime = Date.now();
      return currentTime > tokenData.expiresAt;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true; // Consider expired if can't parse
    }
  }

  private clearStoredData(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  logout(): void {
    console.log('Logging out user...');
    this.clearStoredData();
    console.log('User logged out successfully');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const user = this.currentUserSubject.value;
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    
    // Check both user data and access token
    if (user !== null && accessToken !== null) {
      // Check if token is expired
      if (this.isTokenExpired(accessToken)) {
        console.log('Token is expired, logging out user');
        this.clearStoredData();
        return false;
      }
      return true;
    }
    return false;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
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
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }
      return true;
    }
    return false;
  }
} 