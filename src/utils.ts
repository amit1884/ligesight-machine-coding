import type { ChannelRecord, RegionGroup } from "./types";

export function groupByRegion(data: ChannelRecord[]): RegionGroup[] {
  const grouped: Record<string, RegionGroup> = {};

  data.forEach((item) => {
    if (!grouped[item.region]) {
      grouped[item.region] = {
        region: item.region,
        spend: 0,
        impressions: 0,
        conversions: 0,
        clicks: 0,
        channels: [],
      };
    }

    grouped[item.region].channels.push(item);
    grouped[item.region].spend += item.spend;
    grouped[item.region].impressions += item.impressions;
    grouped[item.region].conversions += item.conversions;
    grouped[item.region].clicks += item.clicks;
  });

  return Object.values(grouped);
}

export function sortData<T>(
  data: T[],
  key: keyof T,
  direction: "asc" | "desc"
) {
  return [...data].sort((a: any, b: any) => {
    const x = a[key];
    const y = b[key];

    if (typeof x === "number" && typeof y === "number") {
      return direction === "asc" ? x - y : y - x;
    }

    return direction === "asc"
      ? String(x).localeCompare(String(y))
      : String(y).localeCompare(String(x));
  });
}

export interface FilterOptions {
  region?: string;
  channel?: string;
}

export function filterRegions(
  data: RegionGroup[],
  filters: FilterOptions
): RegionGroup[] {
  return data
    .filter((r) => {
      if (filters.region && r.region !== filters.region) return false;
      return true;
    })
    .map((r) => ({
      ...r,
      channels: r.channels.filter((c) => {
        if (filters.channel && c.channel !== filters.channel) return false;
        return true;
      }),
    }))
    .filter((r) => r.channels.length > 0);
}
