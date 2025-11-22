
export interface ChannelRecord {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

// What each grouped region looks like
export interface RegionGroup {
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
  channels: ChannelRecord[];
}