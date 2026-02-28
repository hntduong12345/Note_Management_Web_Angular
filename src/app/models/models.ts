export interface Models {}
// 1. User
export interface User {
  id: string;
  email: string;
  mfa_secret?: string;
  created_at: Date | string;
}

// 2. Category
export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon_identifier?: string;
  created_at: Date | string;
}

// 3. Note
export interface Note {
  id: string;
  user_id: string;
  category_id?: string | null;
  title: string;
  content_body: NoteContent;
  is_archived: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  // Relations (for the UI)
  tags?: Tag[];
}

// JSONB NoteContent Data
export interface NoteContent {
  title: string;
  content: string; // HTML string
  // metadata?: {
  //   format: 'html' | 'json';
  //   word_count?: number;
  //   char_count?: number;
  // };
}

// 4. Tag
export interface Tag {
  id: string;
  user_id: string;
  name: string;
  color_code: string;
}

// 5. Note Revision
export interface NoteRevision {
  id: string;
  note_id: string;
  content_snapshot: NoteContent;
  version_number: number;
  created_at: Date | string;
}

// 6. Note Link
export interface NoteLink {
  id: string;
  source_note_id: string;
  target_note_id: string;
  link_context?: string;
  created_at: Date | string;
}

// 7. Attachment // Currently not used
export interface Attachment {
  id: string;
  note_id: string;
  file_url: string;
  file_type?: string;
  file_size_bytes?: number;
  external_id?: string;
  created_at: Date | string;
}
