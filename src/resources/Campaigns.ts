import { OAuthClient } from 'simple-oauth2';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import { sendRequest } from '../utils/request';
import {
	ISCCampaignConfig,
	ISCApiCampaignResponse,
	ISCDeleteCampaignResponses
} from '../interfaces/SCCampaignInterface';

export default class Campaigns {
	private urls: { allCampaigns: string; specificCampaign: string };

	constructor(private options: ISCOptions, private oauth2: OAuthClient) {
		this.urls = {
			allCampaigns: 'https://adsapi.snapchat.com/v1/adaccounts',
			specificCampaign: 'https://adsapi.snapchat.com/v1/campaigns'
		};
	}

	public async createNewCampaign(config: ISCCampaignConfig): Promise<ISCApiCampaignResponse> {
		if (!config.ad_account_id) throw new Error('Must pass in an Ad Account Id!');

		const body = {
			campaigns: [config]
		};

		return sendRequest(
			`${this.urls.allCampaigns}/${config.ad_account_id}/campaigns`,
			{ method: 'POST', body },
			this.options,
			this.oauth2
		);
	}

	public async getAll(adAccountId: string): Promise<ISCApiCampaignResponse> {
		if (!adAccountId) throw new Error('Must pass in an Ad Account Id!');

		return sendRequest(
			`${this.urls.allCampaigns}/${adAccountId}/campaigns`,
			{ method: 'GET' },
			this.options,
			this.oauth2
		);
	}

	public async updateCampaign(adAccountId: string): Promise<ISCApiCampaignResponse> {
		if (!adAccountId) throw new Error('Must pass in an Ad Account Id!');

		return sendRequest(
			`${this.urls.allCampaigns}/${adAccountId}/campaigns`,
			{ method: 'PUT' },
			this.options,
			this.oauth2
		);
	}

	public async getById(campaignId: string): Promise<ISCApiCampaignResponse> {
		if (!campaignId) throw new Error('Must pass in a Campaign Id!');

		return sendRequest(
			`${this.urls.specificCampaign}/${campaignId}`,
			{ method: 'GET' },
			this.options,
			this.oauth2
		);
	}

	public async delete(campaignId: string): Promise<ISCDeleteCampaignResponses> {
		if (!campaignId) throw new Error('Must pass in a Campaign Id!');

		return sendRequest(
			`${this.urls.specificCampaign}/${campaignId}`,
			{ method: 'DELETE' },
			this.options,
			this.oauth2
		);
	}
}
