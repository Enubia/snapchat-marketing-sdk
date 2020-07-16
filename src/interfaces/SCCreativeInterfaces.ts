export enum SnapCropPosition {
  OPTIMIZED = 'OPTIMIZED',
  MIDDLE = 'MIDDLE',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export enum Eligibility {
  FULL_DURATION = 'FULL_DURATION',
  SIX_SECONDS = 'SIX_SECONDS',
  NONE = 'NONE',
}

export enum CallToAction {
  APPLY_NOW = 'APPLY_NOW',
  MORE = 'MORE',
  ORDER_NOW = 'ORDER_NOW',
  PLAY = 'PLAY',
  READ = 'READ',
  SHOP_NOW = 'SHOP_NOW',
  SHOW = 'SHOW',
  SIGN_UP = 'SIGN_UP',
  VIEW = 'VIEW',
  WATCH = 'WATCH',
  DOWNLOAD = 'DOWNLOAD',
  RESPOND = 'RESPOND',
  BUY_TICKETS = 'BUY_TICKETS',
  SHOWTIMES = 'SHOWTIMES',
  BOOK_NOW = 'BOOK_NOW',
  GET_NOW = 'GET_NOW',
  LISTEN = 'LISTEN',
  TRY = 'TRY',
}

export interface ISCCreateRequest {
  /** 25 characters max */
  brandName: string;
  /**
   * Headline (displayed under brand name)
   *
   *  34 characters max
   */
  headline: string;
  /**
   * Allow Users to Share with Friends
   * @default true
   */
  shareable?: boolean;
  name: string;
  topSnapMediaId: number;
  /** @default OPTIMIZED */
  topSnapCropPosition?: SnapCropPosition;
  /**
   * Indicates whether Creative can be used as a Commercial
   */
  forceViewEligibility: Eligibility;
  // default value set in request:
  // adAccountId: number;
  // type: 'SNAP_AD';
}
