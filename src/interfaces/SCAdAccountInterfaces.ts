export interface ISCAdAccountResponse {
	request_status: string;
	request_id: string;
	adaccounts: {
		sub_request_status: string;
		adaccount: {
			id: string;
			updated_at: string;
			created_at: string;
			name: string;
			type: string;
			status: string;
			organization_id: string;
			funding_source_ids: string[];
			currency: string;
			timezone: string;
			advertiser: string;
		};
	}[];
}
