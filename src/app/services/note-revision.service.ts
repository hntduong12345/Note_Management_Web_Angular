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
export class NoteRevisionService {}
