import { OAuthClient } from 'simple-oauth2';
import { sendRequest } from '../utils/request';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import { ISCAdAccountResponse } from '../interfaces/SCAdAccountInterfaces';

export default class AdAccounts {
  private urls: { allAdAccounts: string; specificAdAccount: string };

  constructor(private options: ISCOptions, private oauth2: OAuthClient) {
    this.urls = {
      allAdAccounts: 'https://adsapi.snapchat.com/v1/organizations',
      specificAdAccount: 'https://adsapi.snapchat.com/v1/adaccounts',
    };
  }

  /**
   * Get all ad accounts registered with the given organization id.
   * @param  {string} organizationId
   * @returns Promise
   */
  public async getAll(organizationId: string): Promise<ISCAdAccountResponse> {
    if (!organizationId) throw new Error('Missing organizationId!');

    return sendRequest(
      `${this.urls.allAdAccounts}/${organizationId}/adaccounts`,
      {
        method: 'GET',
      },
      this.options,
      this.oauth2
    );
  }

  /**
   * @param  {string} accountId
   * @returns Promise
   */
  public async getById(accountId: string): Promise<ISCAdAccountResponse> {
    if (!accountId) throw new Error('Missing accountId!');

    return sendRequest(
      `${this.urls.specificAdAccount}/${accountId}`,
      { method: 'GET' },
      this.options,
      this.oauth2
    );
  }
}
