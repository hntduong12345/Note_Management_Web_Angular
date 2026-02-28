export interface NoteRevisionResponse {
  id: string;
  versionNumber: number;
  updatedAt: string;
}

export interface NoteRevisionDetailResponse extends NoteRevisionResponse {
  contentBody: Record<string, any>;
  noteId: string;
}

export interface NoteRevisionRequest {
  contentBody: Record<string, any>;
  versionNumber: number;
}
