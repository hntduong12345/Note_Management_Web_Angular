import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserSession, AuthRequest, AuthResponse } from '../dtos/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  //Setup Auth variables
  private readonly API_URL = 'http://localhost:8080/v1/api/auth'; // Adjust to your BASEURL
  private readonly TOKEN_KEY = 'note_hub_token';
  private readonly USER_KEY = 'note_hub_user';

  //Setup State
  currentUser = signal<UserSession | null>(this.getStoredUser());
  isLoggedIn = computed(() => !!this.currentUser());

  //Api functions
  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, request)
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  register(request: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, request)
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  //Utils functions
  private handleAuthentication(response: AuthResponse) {
    if (response.jwtToken) {
      const session: UserSession = {
        id: response.userId,
        email: response.email,
        token: response.jwtToken,
      };

      this.currentUser.set(session);
      localStorage.setItem(this.TOKEN_KEY, response.jwtToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(session));

      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.currentUser.set(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private getStoredUser(): UserSession | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
