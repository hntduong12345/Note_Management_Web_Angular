import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { NoteResponse, NoteRequest, PageResponse } from '../dtos/note.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly APT_URL = 'http://localhost:8080/v1/api/notes';

  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // Note functions
  searchNotes(
    searchTerm: string = '',
    page: number = 0,
    size: number = 10,
  ): Observable<PageResponse<NoteResponse>> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<NoteResponse>>(
      `${this.APT_URL}/users/${this.userId}/searching`,
      {
        params,
      },
    );
  }

  getNoteDetail(id: string): Observable<NoteResponse> {
    return this.http.get<NoteResponse>(`${this.APT_URL}/${id}`);
  }

  createNote(request: NoteRequest): Observable<NoteResponse> {
    return this.http.post<NoteResponse>(`${this.APT_URL}/users/${this.userId}`, request);
  }

  updateNote(noteId: string, request: NoteRequest): Observable<NoteResponse> {
    return this.http.put<NoteResponse>(`${this.APT_URL}/${noteId}/users/${this.userId}`, request);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.patch<void>(`${this.APT_URL}/${id}`, {});
  }

  //Refresh Utils
  refreshTrigger = signal<number>(0);

  triggerRefresh() {
    this.refreshTrigger.update((v) => v + 1);
  }
}
