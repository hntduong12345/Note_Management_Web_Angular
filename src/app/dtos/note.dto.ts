// Match the PageResponse<T> from Java
export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// Match the NoteResponse DTO
export interface NoteDTO {
  id: string;
  title: string;
  contentBody: Record<string, any>; // Represents the Map<String, Object>
  categoryId: string;
  tags: TagDTO[];
  updatedAt: string; // ISO String from LocalDateTime
}

// Match the NoteRequest DTO
export interface NoteRequest {
  title: string;
  contentBody: Record<string, any>;
  categoryId: string | null;
  tagRequest: CreateTagRequest[];
  lastSyncAt: string | null;
}

export interface TagDTO {
  id: string;
  name: string;
  colorCode?: string;
}

export interface CreateTagRequest {
  name: string;
  color: string;
}
