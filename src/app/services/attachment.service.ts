import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AttachmentResponse, AttachmentUploadRequest } from '../dtos/attachment.dto';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly API_URL = 'http://localhost:8080/v1/api/attachments';

  private get userId(): string {
    const id = this.authService.currentUser()?.id;
    if (!id) {
      console.warn('The user id is not available');
    }
    return id ?? '';
  }

  // Attachment Service Functions
  linkAttachment(request: AttachmentUploadRequest): Observable<AttachmentResponse> {
    return this.http.post<AttachmentResponse>(`${this.API_URL}/users/${this.userId}`, request);
  }

  deleteAttachment(attachmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${attachmentId}/users/${this.userId}`);
  }
}
