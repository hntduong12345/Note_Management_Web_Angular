export interface NoteLinkRequest {
  sourceId: string;
  targetId: string;
  userId: string;
  linkContext: string;
}

export interface NoteLinkResponse {
  id: string;
  sourceId: string;
  targetId: string;
  linkContext: string;
  createdAt: string;
  actionNoteTitle: string;
}
