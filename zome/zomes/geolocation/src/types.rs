use hdk::prelude::*;
use holo_hash::EntryHashB64;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GeolocatedEntryDTO {
    pub entry_hash: EntryHashB64,
    pub latitude: f64,
    pub longitude: f64,
}

#[derive(Clone, Debug, Serialize, Deserialize, SerializedBytes)]
pub struct GeolocationTag {
    pub latitude: f64,
    pub longitude: f64,
}
