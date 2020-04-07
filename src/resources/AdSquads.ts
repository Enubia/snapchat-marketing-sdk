import { OAuthClient } from 'simple-oauth2';
import { ISCOptions } from '../interfaces/SCConfigInterfaces';
import { sendRequest } from '../utils/request';
import {
	ISCAdSquadDeleteResponse,
	ISCAdSquadRequestResponse,
	ISCAdSquadsConfig,
	ISCUpdateAdSquadRequest,
	ISCUpdateAdSquadResponse
} from '../interfaces/SCAdSquadsInterfaces';

export default class AdSquads {
	private urls: {
		specificAdSquad: string;
		allAdSquadsAdAccount: string;
		allAdSquadsCampaign: string;
	};

	constructor(private options: ISCOptions, private oauth2: OAuthClient) {
		this.urls = {
			allAdSquadsCampaign: 'https://adsapi.snapchat.com/v1/campaigns',
			allAdSquadsAdAccount: 'https://adsapi.snapchat.com/v1/adaccounts',
			specificAdSquad: 'https://adsapi.snapchat.com/v1/adsquads'
		};
	}

	public async createNewAdSquad(config: ISCAdSquadsConfig): Promise<ISCAdSquadRequestResponse> {
		if (!config.campaign_id) throw new Error('Must pass in an Campaign Id!');

		return sendRequest(
			`${this.urls.allAdSquadsCampaign}/${config.campaign_id}/adsquads`,
			{
				method: 'POST',
				body: config
			},
			this.options,
			this.oauth2
		);
	}

	public async updateAdSquad(config: ISCUpdateAdSquadRequest): Promise<ISCUpdateAdSquadResponse> {
		if (!config) throw new Error('Missing config!');

		return sendRequest(
			`${this.urls.allAdSquadsCampaign}/${config.campaign_id}/adsquads`,
			{
				method: 'POST',
				body: config
			},
			this.options,
			this.oauth2
		);
	}

	public async getAll(campaignId: string): Promise<ISCAdSquadRequestResponse> {
		if (!campaignId) throw new Error('Missing campaignId!');

		return sendRequest(
			`${this.urls.allAdSquadsCampaign}/${campaignId}/adsquads`,
			{ method: 'GET' },
			this.options,
			this.oauth2
		);
	}

	public async getAllByAccountId(adAccountId: string): Promise<ISCAdSquadRequestResponse> {
		if (!adAccountId) throw new Error('Missing adAccountId!');

		return sendRequest(
			`${this.urls.allAdSquadsAdAccount}/${adAccountId}/adsquads`,
			{ method: 'GET' },
			this.options,
			this.oauth2
		);
	}

	public async getById(adSquadId: string): Promise<ISCAdSquadRequestResponse> {
		if (!adSquadId) throw new Error('Missing adSquadId!');

		return sendRequest(
			`${this.urls.specificAdSquad}/${adSquadId}`,
			{ method: 'GET' },
			this.options,
			this.oauth2
		);
	}

	public async delete(adSquadId: string): Promise<ISCAdSquadDeleteResponse> {
		if (!adSquadId) throw new Error('Missing adSquadId!');

		return sendRequest(
			`${this.urls.specificAdSquad}/${adSquadId}`,
			{ method: 'DELETE' },
			this.options,
			this.oauth2
		);
	}
}
