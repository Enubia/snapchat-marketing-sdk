import { OAuthClient } from 'simple-oauth2';
import * as FormData from 'form-data';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import { getFileSizeInBytes, sendRequest } from '../utils/request';
import {
  ISCMediaConfig,
  ISCApiMediaResponse,
  ISCMediaUploadResponse,
  ISCApiMediaPreviewResponse,
  ISCMediaUploadChunkedINIT,
} from '../interfaces/SCMediaInterfaces';

export default class Media {
  private urls: { allMedia: string; specificMedia: string };

  constructor(private options: ISCOptions, private oauth2: OAuthClient) {
    this.urls = {
      allMedia: 'https://adsapi.snapchat.com/v1/adaccounts',
      specificMedia: 'https://adsapi.snapchat.com/v1/media',
    };
  }

  private async uploadFile(
    mediaId: string,
    filename: string,
    file: Buffer,
  ): Promise<ISCMediaUploadResponse> {
    const form = new FormData();

    form.append('file', Buffer.from(file), {
      filename,
    });
    const body = {
      data: form,
    };

    this.options.baseHttpOptions.headers['Content-Type'] = 'multipart/formdata';

    return sendRequest(
      `${this.urls.allMedia}/${mediaId}/upload`,
      { method: 'POST', body },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {ISCMediaConfig} config
   * @returns {Promise<ISCApiMediaResponse>}
   */
  public async create(config: ISCMediaConfig): Promise<ISCApiMediaResponse> {
    if (!config || !config.ad_account_id || !config.name || !config.type)
      throw new Error('Missing config parameters!');

    const body = {
      media: [
        {
          name: config.name,
          type: config.type,
          ad_account_id: `{${config.ad_account_id}}`,
        },
      ],
    };

    return sendRequest(
      `${this.urls.allMedia}/${config.ad_account_id}/media`,
      { method: 'POST', body },
      this.options,
      this.oauth2,
    );
  }

  /**
   * Max file size 30MB (max request size is 32MB)
   *
   * @param {string} mediaId
   * @param {string} filename
   * @param {Buffer} video
   * @returns {Promise<ISCMediaUploadResponse>}
   */
  public async uploadVideo(
    mediaId: string,
    filename: string,
    video: Buffer,
  ): Promise<ISCMediaUploadResponse> {
    if (!mediaId) throw new Error('Missing mediaId!');
    if (!filename) throw new Error('Missing filename!');
    if (!video) throw new Error('Missing video buffer!');

    if (getFileSizeInBytes(video.toString('base64')) > 30000000) {
      throw new Error(`File ${filename} is to large for upload, max 30MB!`);
    }

    return this.uploadFile(mediaId, filename, video);
  }

  /**
   * File type should be PNG, JPG or JPEG
   * Minimum image size: 1080 x 1920 pixels
   * Required Image Ratio: 9:16
   * Max file size: 5MB
   *
   * @param {string} mediaId
   * @param {string} filename
   * @param {Buffer} file
   * @returns {Promise<ISCMediaUploadResponse>}
   */
  public async uploadImage(
    mediaId: string,
    filename: string,
    file: Buffer,
  ): Promise<ISCMediaUploadResponse> {
    if (!mediaId) throw new Error('Missing mediaId!');
    if (!filename) throw new Error('Missing filename!');
    if (!file) throw new Error('Missing file buffer!');

    if (getFileSizeInBytes(file.toString('base64')) > 5000000) {
      throw new Error(`File ${filename} is to large for upload, max 5MB!`);
    }

    return this.uploadFile(mediaId, filename, file);
  }

  /**
   * @param {string} mediaId
   * @param {string} fileName
   * @param {number} fileSize in bytes
   * @param {number} numberOfParts
   * @returns {ISCMediaUploadChunkedINIT}
   */
  public async uploadLargeInit(
    mediaId: string,
    fileName: string,
    fileSize: number,
    numberOfParts: number,
  ): Promise<ISCMediaUploadChunkedINIT> {
    if (!mediaId) throw new Error('Missing mediaId!');
    if (!fileName) throw new Error('Missing fileName!');
    if (!fileSize) throw new Error('Missing fileSize!');
    if (!numberOfParts) throw new Error('Missing missing numberOfParts!');

    const body = {
      data: {
        file_name: fileName,
        file_size: fileSize,
        number_of_parts: numberOfParts,
      },
    };

    return sendRequest(
      `${this.urls.allMedia}/${mediaId}/multipart-upload-v2?action=INIT`,
      {
        method: 'POST',
        body,
      },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {Buffer} filePart max 32mb
   * @param {number} partNumber
   * @param {number} uploadId obtained from init
   * @param {string} addPath obtained from init
   */
  public async uploadLargeAdd(
    filePart: Buffer,
    partNumber: number,
    uploadId: number,
    addPath: string,
  ): Promise<Record<string, unknown>> {
    if (!filePart) throw new Error('Missing filePart!');
    if (!partNumber) throw new Error('Missing partNumber!');
    if (!uploadId) throw new Error('Missing uploadId!');

    if (getFileSizeInBytes(filePart.toString('base64')) > 32000000) {
      throw new Error(`File part is to large for upload, max 32MB!`);
    }

    const myForm = new FormData();

    myForm.append('file', Buffer.from(filePart));
    myForm.append('part_number', partNumber);
    myForm.append('upload_id', uploadId);

    const body = {
      data: myForm.getBuffer(),
    };

    return sendRequest(
      `https://adsapi.snapchat.com${addPath}`,
      { method: 'POST', body },
      this.options,
      this.oauth2,
      myForm.getHeaders()['Content-Type'],
    );
  }

  /**
   * Callable after every file part is uploaded
   * @param {string} uploadId obtained from init
   * @param {string} finalizePath obtained from init
   */
  public async uploadLargeFinalize(
    uploadId: number,
    finalizePath: string,
  ): Promise<ISCApiMediaResponse> {
    if (!finalizePath) throw new Error('Missing finalizePath!');
    if (!uploadId) throw new Error('Missing uploadId!');

    const body = {
      data: {
        upload_id: uploadId,
      },
    };

    return sendRequest(
      `https://adsapi.snapchat.com${finalizePath}`,
      { method: 'POST', body },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {string} adAccountId
   * @returns {Promise<ISCApiMediaResponse>}
   */
  public async getAll(adAccountId: string): Promise<ISCApiMediaResponse> {
    if (!adAccountId) throw new Error('Missing adAccountId!');

    return sendRequest(
      `${this.urls.allMedia}/${adAccountId}/media`,
      { method: 'GET' },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {string} mediaId
   * @returns {Promise<ISCApiMediaResponse>}
   */
  public async getById(mediaId: string): Promise<ISCApiMediaResponse> {
    if (!mediaId) throw new Error('Missing mediaId!');

    return sendRequest(
      `${this.urls.specificMedia}/${mediaId}`,
      { method: 'GET' },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {string} mediaId
   * @returns {Promise<ISCApiMediaPreviewResponse>}
   */
  public async getPreview(mediaId: string): Promise<ISCApiMediaPreviewResponse> {
    if (!mediaId) throw new Error('Missing mediaId!');

    return sendRequest(
      `${this.urls.specificMedia}/${mediaId}/preview`,
      { method: 'GET' },
      this.options,
      this.oauth2,
    );
  }

  /**
   * @param {string} mediaId
   * @returns {Promise<ISCApiMediaPreviewResponse>}
   */
  public async getThumbnail(mediaId: string): Promise<ISCApiMediaPreviewResponse> {
    if (!mediaId) throw new Error('Missing mediaId!');

    return sendRequest(
      `${this.urls.specificMedia}/${mediaId}/thumbnail`,
      { method: 'GET' },
      this.options,
      this.oauth2,
    );
  }
}
