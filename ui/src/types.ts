import { AgentPubKeyB64, EntryHashB64 } from '@holochain-open-dev/core-types';

export const TODO_REPLACE_NAME_CONTEXT = 'hc_zome_todo_rename/service';

export interface GeolocatedEntryDTO {
  entryHash: EntryHashB64;
  latitude: number;
  longitude: number;
}
