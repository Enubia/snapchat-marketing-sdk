import { OAuthClient } from 'simple-oauth2';
import {
	ISCAds,
	ISCCreateOrUpdateAdResponse,
	ISCDeleteAdResponse
} from '../interfaces/SCAdsInterfaces';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import { sendRequest } from '../utils/request';

export default class Ads {
	private url: {
		ads: string;
		adAccount: string;
	};

	constructor(private options: ISCOptions, private oauth2: OAuthClient) {
		this.url = {
			ads: 'https://adsapi.snapchat.com/v1/adsquads/',
			adAccount: 'https://adsapi.snapchat.com/v1/ads/'
		};
	}

	public async createNewAd(config: ISCAds): Promise<ISCCreateOrUpdateAdResponse> {
		if (!config.ad_squad_id) throw new Error('Missing config!');

		return sendRequest(
			`${this.url.ads}/${config.ad_squad_id}/ads`,
			{
				method: 'POST',
				body: { ...config }
			},
			this.options,
			this.oauth2
		);
	}

	public async update(config: ISCAds): Promise<ISCCreateOrUpdateAdResponse> {
		if (!config.ad_squad_id) throw new Error('Missing config!');

		return sendRequest(
			`${this.url.ads}/${config.ad_squad_id}/ads`,
			{
				method: 'PUT',
				body: { ...config }
			},
			this.options,
			this.oauth2
		);
	}

	public async getAllFromAdSquad(adSquadId: string): Promise<ISCCreateOrUpdateAdResponse> {
		if (!adSquadId) throw new Error('Missing adSquadId!');

		return sendRequest(
			`${this.url.ads}/${adSquadId}/ads`,
			{
				method: 'GET'
			},
			this.options,
			this.oauth2
		);
	}

	public async getAllFromAdAccount(adAccountId: string): Promise<ISCCreateOrUpdateAdResponse> {
		if (!adAccountId) throw new Error('Missing adAccountId!');

		return sendRequest(
			`${this.url.adAccount}${adAccountId}`,
			{
				method: 'GET'
			},
			this.options,
			this.oauth2
		);
	}

	public async getAdById(adId: string): Promise<ISCCreateOrUpdateAdResponse> {
		if (!adId) throw new Error('Missing adId!');

		return sendRequest(
			`${this.url.adAccount}${adId}`,
			{
				method: 'GET'
			},
			this.options,
			this.oauth2
		);
	}

	public async deleteAd(adId: string): Promise<ISCDeleteAdResponse> {
		if (!adId) throw new Error('Missing adId!');

		return sendRequest(
			`${this.url.adAccount}${adId}`,
			{
				method: 'DELETE'
			},
			this.options,
			this.oauth2
		);
	}
}
