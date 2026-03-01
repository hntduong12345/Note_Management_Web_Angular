export interface CategoryRequest {
  name: string;
  iconIdentifier: File;
}

export interface CategoryResponse {
  id: string;
  name: string;
  iconIdentifier: string;
  createdAt: string;
}
