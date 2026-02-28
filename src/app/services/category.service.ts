import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CategoryRequest, CategoryResponse } from '../dtos/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/v1/api/categories';

  // Get userId function
  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // Category Service Functions
  getAllCategories(): Observable<CategoryResponse[]> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.get<CategoryResponse[]>(this.API_URL, { params });
  }

  createCategory(request: CategoryRequest): Observable<CategoryResponse> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.post<CategoryResponse>(this.API_URL, request, { params });
  }

  updateCategory(request: CategoryRequest, id: string): Observable<CategoryResponse> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.put<CategoryResponse>(`${this.API_URL}/${id}`, request, { params });
  }

  deleteCategory(id: string): Observable<void> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.delete<void>(`${this.API_URL}/${id}`, { params });
  }
}
