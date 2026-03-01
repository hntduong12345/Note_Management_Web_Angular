export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface NoteResponse {
  id: string;
  title: string;
  contentBody: {
    title: string;
    content: string;
  };
  categoryId: string;
  tags: TagDTO[];
  updatedAt: string;
}

export interface NoteRequest {
  title: string;
  contentBody: {
    title: string;
    content: string;
  };
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
