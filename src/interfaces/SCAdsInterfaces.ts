export interface ISCAds {
	ad_squad_id: string;
	creative_id: string;
	name: string;
	status: 'ACTIVE' | 'PAUSED';
	type:
		| 'SNAP_AD'
		| 'LONGFORM_VIDEO'
		| 'APP_INSTALL'
		| 'REMOTE_WEBPAGE'
		| 'DEEP_LINK'
		| 'STORY'
		| 'AD_TO_LENS'
		| 'LENS'
		| 'LENS_WEB_VIEW'
		| 'LENS_APP_INSTALL'
		| 'LENS_DEEP_LINK'
		| 'LENS_LONGFORM_VIDEO';
}

export interface ISCCreateOrUpdateAdResponse {
	request_status: string;
	request_id: string;
	ads: {
		sub_request_status: string;
		ad: {
			id: string;
			updated_at: string;
			created_at: string;
			name: string;
			ad_squad_id: string;
			creative_id: string;
			status: string;
			type: string;
		};
	}[];
}

export interface ISCDeleteAdResponse {
	request_status: string;
	request_id: string;
	ads: [];
}
