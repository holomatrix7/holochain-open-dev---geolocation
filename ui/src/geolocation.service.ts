import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { GeolocatedEntryDTO } from './types';

export class GeolocationService {
  constructor(
    protected appWebsocket: AppWebsocket,
    protected cellId: CellId,
    protected zomeName = 'hc_zome_geolocation'
  ) {}

  async geolocateEntry(geolocationInput: GeolocatedEntryDTO): Promise<void> {
    return this.callZome('geolocate_entry', geolocationInput);
  }

  async getAllGeolocatedEntries(): Promise<Array<GeolocatedEntryDTO>> {
    return this.callZome('get_all_geolocated_entries', null);
  }
  
  async callZome(fn_name: string, payload: any) {
    return this.appWebsocket.callZome({
      cap: null as any,
      cell_id: this.cellId,
      zome_name: this.zomeName,
      fn_name: fn_name,
      payload: payload,
      provenance: this.cellId[1],
    });
  }
}
