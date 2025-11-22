import { useMemo, useState } from "react";
import rawData from "../../json/marketing_dashboard.json";
import { groupByRegion, filterRegions } from "../../utils";
import type { ChannelRecord, RegionGroup } from "../../types";
import { Table, type Column } from "../../components/Table/Table";
import CustomDropdown from "../../components/CustomDropDown";

export default function RegionTable() {
    const [openRegion, setOpenRegion] = useState<string | null>(null);

    // FILTER STATES
    const [regionFilter, setRegionFilter] = useState("");
    const [channelFilter, setChannelFilter] = useState("");

    const baseRegions = useMemo(
        () => groupByRegion(rawData as ChannelRecord[]),
        []
    );

    const filteredRegions = useMemo(() => {
        return filterRegions(baseRegions, {
            region: regionFilter || undefined,
            channel: channelFilter || undefined,
        });
    }, [baseRegions, regionFilter, channelFilter]);

    // REGION COLUMNS
    const regionColumns: Column<RegionGroup>[] = [
        { key: "region", header: "Region", sortable: true },
        { key: "spend", header: "Spend", sortable: true, render: r => r.spend.toFixed(2) },
        { key: "impressions", header: "Impressions", sortable: true },
        { key: "conversions", header: "Conversions", sortable: true },
        { key: "clicks", header: "Clicks", sortable: true }
    ];

    // CHANNEL COLUMNS
    const channelColumns: Column<ChannelRecord>[] = [
        {
            key: "channel",
            header: "Channel",
            sortable: true,
            render: (c) => <span style={{ paddingLeft: 24 }}>{c.channel}</span>,
        },
        { key: "spend", header: "Spend", sortable: true, render: (c) => c.spend.toFixed(2) },
        { key: "impressions", header: "Impressions", sortable: true },
        { key: "conversions", header: "Conversions", sortable: true },
        { key: "clicks", header: "Clicks", sortable: true }
    ];

    return (
        <div>

            {/* FILTER UI */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20 ,alignItems:'center'}}>
                <h3>Filters</h3>
                <CustomDropdown
                    value={regionFilter}
                    onChange={setRegionFilter}
                    placeholder="Filter by Region"
                    options={[
                        { label: "All Regions", value: "" },
                        ...baseRegions.map((r) => ({
                            label: r.region,
                            value: r.region,
                        })),
                    ]}
                />

                <CustomDropdown
                    value={channelFilter}
                    onChange={setChannelFilter}
                    placeholder="Filter by Channel"
                    options={[
                        { label: "All Channels", value: "" },
                        ...[...new Set(rawData.map((c) => c.channel))].map((ch) => ({
                            label: ch,
                            value: ch,
                        })),
                    ]}
                />
            </div>

            <Table
                data={filteredRegions}
                columns={regionColumns}
                pageSize={20}
                onRowClick={(row) =>
                    setOpenRegion((prev) => (prev === row.region ? null : row.region))
                }
                isExpanded={(row) => openRegion === row.region}
                renderExpanded={(row) => (
                    <Table
                        data={row.channels}
                        columns={channelColumns}
                        pageSize={20}
                    // showHead={false}
                    />
                )}
            />
        </div>
    );
}
