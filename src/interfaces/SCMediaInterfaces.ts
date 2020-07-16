export interface ISCMediaConfig {
  ad_account_id: string;
  name: string;
  type: string;
}

export interface ISCMediaUploadChunkedINIT {
  add_path: string;
  upload_id: string;
  finalize_path: string;
}

export interface ISCMediaUploadResponse {
  result: {
    id: string;
    updated_at: string;
    created_at: string;
    name: string;
    ad_account_id: string;
    type: string;
    media_status: string;
    file_name: string;
    download_link?: string;
  };
  request_status: string;
  request_id: string;
}

export interface ISCApiMediaResponse {
  request_status: string;
  request_id: string;
  media: {
    sub_request_status: string;
    media: {
      id: string;
      updated_at: Date;
      created_at: Date;
      name: string;
      ad_account_id: string;
      type: string;
      media_status: string;
      file_name?: string;
    };
  }[];
}

export interface ISCApiMediaPreviewResponse {
  request_status: string;
  request_id: string;
  expires_at: string;
  link: string;
}
