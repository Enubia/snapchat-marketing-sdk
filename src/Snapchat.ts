import { create, OAuthClient, Token } from 'simple-oauth2';
import AdAccounts from './resources/AdAccounts';
import AdSquads from './resources/AdSquads';
import Campaigns from './resources/Campaigns';
import Ads from './resources/Ads';
import { ISCConfig, ISCOptions } from './interfaces/SCConfigInterfaces';

export default class Snapchat {
	public addAccounts: AdAccounts;

	public adSquads: AdSquads;

	public campaigns: Campaigns;

	private readonly options: ISCOptions;

	private readonly oauth2: OAuthClient;

	private ads: Ads;

	constructor(config: ISCConfig) {
		this.options = {
			credentials: {
				client: {
					id: config.id,
					secret: config.secret
				},
				auth: {
					tokenHost: 'https://accounts.snapchat.com',
					tokenPath: '/login/oauth2/access_token'
				},
				options: {
					authorizationMethod: 'body'
				}
			},
			redirect_uri: config.redirectUri,
			accessToken: '',
			refreshToken: undefined as any,
			tokenExpiration: 0,
			accessTokenLastSet: 0,
			baseHttpOptions: {
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true,
				credentials: 'include'
			},
			urls: {
				authorize: `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${config.id}&redirect_uri=${config.redirectUri}&response_type=code`,
				me: 'https://adsapi.snapchat.com/v1/me'
			}
		};
		this.oauth2 = create(this.options.credentials);
		this.addAccounts = new AdAccounts(this.options, this.oauth2);
		this.adSquads = new AdSquads(this.options, this.oauth2);
		this.campaigns = new Campaigns(this.options, this.oauth2);
		this.ads = new Ads(this.options, this.oauth2);
	}

	/**
	 * Get the authorization url from the given scope.
	 *
	 * @param scope
	 * */
	public getAuthorizeUrl = (scope: string): string =>
		`${this.options.urls.authorize}&scope${scope}`;

	/**
	 * Authorize this session and set tokens + expiration time.
	 *
	 * @param authorizationCode
	 * */
	public async authorize(authorizationCode: string): Promise<Token> {
		const tokenConfig = {
			code: authorizationCode,
			redirect_uri: this.options.redirect_uri
		};

		try {
			const result = await this.oauth2.authorizationCode.getToken(tokenConfig);
			const tokenData = this.oauth2.accessToken.create(result).token;

			this.options.accessToken = tokenData.access_token;
			this.options.refreshToken = tokenData.refresh_token;
			this.options.accessTokenLastSet = Date.now();
			this.options.tokenExpiration = (new Date().getSeconds() + tokenData.expires_in) * 1000;

			return tokenData;
		} catch (err) {
			throw new Error(`Error while fetching tokenData: ${err}`);
		}
	}
}
