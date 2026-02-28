import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../dtos/user.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/v1/api/users';

  // Get userId function
  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // User Functions
  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/${id}`);
  }

  getUserByEmail(email: string): Observable<UserResponse> {
    const params = new HttpParams().set('email', email);

    return this.http.get<UserResponse>(`${this.API_URL}/email`, { params });
  }
}
