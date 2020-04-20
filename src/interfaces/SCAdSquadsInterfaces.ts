export enum SCSquadOptimizationGoals {
  IMPRESSIONS = 'IMPRESSIONS',
  SWIPES = 'SWIPES',
  APP_INSTALLS = 'APP_INSTALLS',
  VIDEO_VIEWS = 'VIDEO_VIEWS',
  VIDEO_VIEWS_15_SEC = 'VIDEO_VIEWS_15_SEC',
  USES = 'USES',
  STORY_OPENS = 'STORY_OPENS',
  PIXEL_PAGE_VIEW = 'PIXEL_PAGE_VIEW',
  PIXEL_ADD_TO_CART = 'PIXEL_ADD_TO_CART',
  PIXEL_PURCHASE = 'PIXEL_PURCHASE',
  PIXEL_SIGNUP = 'PIXEL_SIGNUP',
  APP_ADD_TO_CART = 'APP_ADD_TO_CART',
  APP_PURCHASE = 'APP_PURCHASE',
  APP_SIGNUP = 'APP_SIGNUP',
}

export interface ISCPlacementV2 {
  config: 'AUTOMATIC' | 'CUSTOM';
  platforms?: 'SC';
  SC_positions: 'INTERSTITIAL_USER' | 'INTERSTITIAL_CONTENT' | 'INSTREAM' | 'FEED' | 'CAMERA';
  /* Ad Squad must be of type SNAP_ADS, SC_positions must include INSTREAM */
  inclusion: {
    /* List of possible content types */
    content_types: [];
  };
  /* Ad Squad must be of type SNAP_ADS, SC_positions must include INSTREAM */
  exclusion: {
    /* List of possible content types */
    content_types: [];
  };
}

export interface ISCAdSquad {
  campaign_id: string;
  bid_micro: string;
  billing_event: SCSquadOptimizationGoals.IMPRESSIONS;
  /* one of daily_budget_micro or lifetime_budget_micro must be set
   * minimum value: 20000000
   */
  daily_budget_micro?: number;
  /* one of daily_budget_micro or lifetime_budget_micro must be set */
  lifetime_budget_micro?: number;
  end_time?: Date;
  name: string;
  optimization_goal: SCSquadOptimizationGoals;
  placement: 'SNAP_ADS' | 'CONTENT' | 'USER_STORIES' | 'DISCOVER_FEED';
  start_time?: Date;
  status: 'ACTIVE' | 'PAUSED';
  targeting: any;
  type: 'SNAP_ADS' | 'LENS';
  included_content_types?:
    | 'NEWS'
    | 'ENTERTAINMENT'
    | 'GAMING'
    | 'SCIENCE_TECHNOLOGY'
    | 'BEAUTY_FASHION'
    | 'MENS_LIFESTYLE'
    | 'WOMENS_LIFESTYLE'
    | 'GENERAL_LIFESTYLE'
    | 'FOOD'
    | 'SPORTS'
    | 'YOUNG_BOLD';
  excluded_content_types?:
    | 'NEWS'
    | 'ENTERTAINMENT'
    | 'GAMING'
    | 'SCIENCE_TECHNOLOGY'
    | 'BEAUTY_FASHION'
    | 'MENS_LIFESTYLE'
    | 'WOMENS_LIFESTYLE'
    | 'GENERAL_LIFESTYLE'
    | 'FOOD'
    | 'SPORTS'
    | 'YOUNG_BOLD';
  cap_and_exclusion_config?: {
    frequency_cap_count: number;
    frequency_cap_type: 'IMPRESSIONS';
    time_interval: number;
    frequency_cap_interval: 'HOURS' | 'DAYS';
  };
  ad_scheduling_config?: {
    /* 0-23 */
    hour_of_day: number[];
  };
  auto_bid?: boolean;
  target_bid?: boolean;
  pixel_id?: string;
  measurement_provider_names?: 'MOAT_SS' | 'DOUBLEVERIFY';
  /* Must be set to PENDING which automatically updates to ACTIVE or FAILED after booking */
  reach_and_frequency_status: 'PENDING';
  delivery_constraint: 'REACH_AND_FREQUENCY';
  /* Must match the value in the forecasting request */
  reach_goal: any;
  /* Must match the value in the forecasting request */
  impression_goal: any;
  /* Json object containing advanced placement options */
  placement_v2: ISCPlacementV2;
  pacing_type: 'STANDARD' | 'ACCELERATED';
}

export interface ISCAdSquadsConfig {
  campaign_id: string;
  name: string;
  type: string;
  placement: string;
  optimization_goal: string;
  bid_micro: number;
  daily_budget_micro: number;
  billing_event: string;
  targeting: {
    geos: [
      {
        country_code: string;
      },
    ];
  };
  start_time: Date;
}

export interface ISCAdSquadRequestResponse {
  request_status: string;
  request_id: string;
  adsquads: {
    sub_request_status: string;
    adsquad: {
      id: string;
      updated_at: Date;
      created_at: Date;
      name: string;
      status: string;
      campaign_id: string;
      type: string;
      targeting: {
        geos?: [
          {
            country_code: string;
          },
        ];
      };
      placement: string;
      billing_event: string;
      bid_micro: number;
      daily_budget_micro: number;
      start_time: string;
      optimization_goal: string;
    };
  }[];
}

export interface ISCUpdateAdSquadRequest {
  campaign_id: string;
  bid_micro: number;
  /* one of daily_budget_micro or lifetime_budget_micro is required */
  daily_budget_micro?: number;
  /* one of daily_budget_micro or lifetime_budget_micro is required */
  lifetime_budget_micro?: number;
  end_time?: Date;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  targeting: any;
  pixel_id?: string;
  cap_and_exclusion_config?: any;
  included_content_types?:
    | 'NEWS'
    | 'ENTERTAINMENT'
    | 'GAMING'
    | 'SCIENCE_TECHNOLOGY'
    | 'BEAUTY_FASHION'
    | 'MENS_LIFESTYLE'
    | 'WOMENS_LIFESTYLE'
    | 'GENERAL_LIFESTYLE'
    | 'FOOD'
    | 'SPORTS'
    | 'YOUNG_BOLD';
  excluded_content_types?:
    | 'NEWS'
    | 'ENTERTAINMENT'
    | 'GAMING'
    | 'SCIENCE_TECHNOLOGY'
    | 'BEAUTY_FASHION'
    | 'MENS_LIFESTYLE'
    | 'WOMENS_LIFESTYLE'
    | 'GENERAL_LIFESTYLE'
    | 'FOOD'
    | 'SPORTS'
    | 'YOUNG_BOLD';
  pacing_type: 'STANDARD' | 'ACCELERATED';
}

export interface ISCUpdateAdSquadResponse {
  status: string;
  request_id: string;
  adsquads: {
    status: string;
    adsquad: {
      id: string;
      updated_at: Date;
      created_at: Date;
      name: string;
      campaign_id: string;
      type: string;
      placement: string;
      optimization_goal: string;
      bid_micro: number;
      daily_budget_micro: number;
    };
  }[];
}

export interface ISCAdSquadDeleteResponse {
  request_status: string;
  request_id: string;
  adsquads: [];
}
