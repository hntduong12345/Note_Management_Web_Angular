import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NoteLinkResponse, NoteLinkRequest } from '../dtos/note-link.dto';

@Injectable({
  providedIn: 'root',
})
export class NoteLinkService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/v1/api/note-links';

  // Get userId function
  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // Note Link Service Functions
  getTargetNoteLinks(noteId: string): Observable<NoteLinkResponse[]> {
    const params = new HttpParams().set('noteId', noteId).set('userId', this.userId);
    return this.http.get<NoteLinkResponse[]>(`${this.API_URL}/targets`, { params });
  }

  getSourceNoteLinks(noteId: string): Observable<NoteLinkResponse[]> {
    const params = new HttpParams().set('noteId', noteId).set('userId', this.userId);
    return this.http.get<NoteLinkResponse[]>(`${this.API_URL}/sources`, { params });
  }

  createNoteLinks(request: NoteLinkRequest): Observable<NoteLinkResponse> {
    return this.http.post<NoteLinkResponse>(this.API_URL, request);
  }

  removeNoteLink(linkId: string): Observable<void> {
    const params = new HttpParams().set('userId', this.userId);
    return this.http.delete<void>(`${this.API_URL}/${linkId}`, { params });
  }
}
