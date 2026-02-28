export interface CategoryRequest {
  name: string;
  iconIdentifier: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  iconIdentifier: string;
  createdAt: string;
}
