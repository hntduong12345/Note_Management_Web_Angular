export interface AttachmentResponse {
  id: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes: number;
}

export interface AttachmentUploadRequest {
  noteId: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes: number;
}
