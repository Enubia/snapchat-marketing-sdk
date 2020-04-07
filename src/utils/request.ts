import axios from 'axios';
import { OAuthClient } from 'simple-oauth2';
import { ISCRequestParams, ISCOptions } from '../interfaces/SCConfigInterfaces';

export const isTokenStale = (options: ISCOptions): boolean => {
	return (
		Date.now() - (options.accessTokenLastSet + options.tokenExpiration) > options.tokenExpiration
	);
};

export const refreshAccessToken = async (
	options: ISCOptions,
	oauth2: OAuthClient
): Promise<void> => {
	const accessToken = oauth2.accessToken.create({
		refresh_token: options.refreshToken
	});

	await accessToken
		.refresh()
		.then(tokenData => {
			options.accessToken = tokenData.token.access_token;
			options.accessTokenLastSet = Date.now();
			options.tokenExpiration = (new Date().getSeconds() + tokenData.token.expires_in) * 1000;
		})
		.catch(err => {
			throw new Error(`Error refreshing access token: ${err}`);
		});
};

export const sendRequest = async (
	url: string,
	request: ISCRequestParams,
	snapChatOptions: ISCOptions,
	oauthClient: OAuthClient
): Promise<any> => {
	if (isTokenStale(snapChatOptions)) await refreshAccessToken(snapChatOptions, oauthClient);

	const requestOptions = { ...snapChatOptions.baseHttpOptions, ...request };
	requestOptions.headers.Authorization = `Bearer ${snapChatOptions.accessToken}`;

	try {
		return await axios(url, requestOptions);
	} catch (err) {
		throw new Error(`Error during request: ${err}`);
	}
};
