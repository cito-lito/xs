export interface UrlResponse {
  shortUrl: string;
  longUrl: string;
  userId: string;
  shortCode: string;
  createdAt: string;
}

export interface UserUrlsResponse {
  userId: string;
  urls: UrlResponse[];
  pagination: PaginationMetadata;
}

export interface PaginationMetadata {
  totalUrls: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface UrlRequest {
  longUrl: string;
  userId?: string;
}
