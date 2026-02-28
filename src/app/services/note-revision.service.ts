import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NoteResponse } from '../dtos/note.dto';
import {
  NoteRevisionResponse,
  NoteRevisionDetailResponse,
  NoteRevisionRequest,
} from '../dtos/note-revision.dto';

@Injectable({
  providedIn: 'root',
})
export class NoteRevisionService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/v1/api/note-revisions';

  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // Note Revision Functions
  getRevisionHistory(noteId: string): Observable<NoteRevisionResponse[]> {
    const params = new HttpParams().set('noteId', noteId).set('userId', this.userId);

    return this.http.get<NoteRevisionResponse[]>(this.API_URL, { params });
  }

  getRevisionDetail(revisionId: string): Observable<NoteRevisionDetailResponse> {
    const params = new HttpParams().set('userId', this.userId);

    return this.http.get<NoteRevisionDetailResponse>(`${this.API_URL}/${revisionId}`, { params });
  }

  createRevision(noteId: string, request: NoteRevisionRequest): Observable<void> {
    const params = new HttpParams().set('noteId', noteId).set('userId', this.userId);

    return this.http.post<void>(this.API_URL, request, { params });
  }

  restoreRevision(revisionId: string): Observable<NoteResponse> {
    const params = new HttpParams().set('userId', this.userId);

    return this.http.put<NoteResponse>(`${this.API_URL}/${revisionId}`, {}, { params });
  }
}
