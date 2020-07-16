import { OAuthClient } from 'simple-oauth2';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import {
  ISCCreateRequest,
  CallToAction,
  Eligibility,
  SnapCropPosition,
} from '../interfaces/SCCreativeInterfaces';

export default class Creative {
  private urls: { adAccounts: string };

  constructor(private options: ISCOptions, private oauth2: OAuthClient) {
    this.urls = {
      adAccounts: 'https://adsapi.snapchat.com/v1/adaccounts',
    };
  }
}
