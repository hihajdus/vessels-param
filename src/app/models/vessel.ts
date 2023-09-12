export interface Vessel {
    id: number;
    name: string;
    mmsi?: number;
    imo?: number;
    companyId?: number;
    companyName?: string;
    startDate?: Date;
    active?: boolean;
    vesselType?: string;
}
