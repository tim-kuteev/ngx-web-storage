export interface WebStorageItemAction {
  action: string;
  key: string;
  value?: any;
}

export interface WebStorageServiceError {
  code: number;
  message: string;
}
