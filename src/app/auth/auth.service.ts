import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private isBrowser: boolean;
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Only check localStorage if running in a browser
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // For demo purposes, we'll simulate a successful login
    // In a real app, you would make an HTTP request to your backend
    const user: User = {
      id: '1',
      email: email,
      firstName: 'Bernard',
      lastName: 'Breaking into code',
      profileImage: 'https://lh3.googleusercontent.com/a/default-user'
    };
    
    // Store user in local storage only if in browser
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    
    return of(user);
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    // For demo purposes, we'll simulate a successful registration
    // In a real app, you would make an HTTP request to your backend
    const user: User = {
      id: '1',
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileImage: 'https://lh3.googleusercontent.com/a/default-user'
    };
    
    // Store user in local storage only if in browser
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    
    return of(user);
  }

  logout(): void {
    // Remove user from local storage only if in browser
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  updateUserProfile(user: Partial<User>): Observable<User> {
    // Update the current user with new information
    const updatedUser = { ...this.currentUser, ...user } as User;
    
    // Store updated user in local storage only if in browser
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    this.currentUserSubject.next(updatedUser);
    
    return of(updatedUser);
  }
}
