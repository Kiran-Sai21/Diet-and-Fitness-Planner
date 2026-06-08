import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:1010/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.storeUser(res))
    );
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(res => this.storeUser(res))
    );
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    const user = this.getStoredUser();
    return user?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'ADMIN';
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  private storeUser(res: AuthResponse): void {
    localStorage.setItem('auth', JSON.stringify(res));
    this.currentUserSubject.next(res);
  }

  private getStoredUser(): AuthResponse | null {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
  }
}
