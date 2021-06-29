use hdk::prelude::*;
use types::{GeolocatedEntryDTO, GeolocationTag};

mod types;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

entry_defs![Path::entry_def()];

/** Geolocation **/

#[hdk_extern]
pub fn geolocate_entry(geolocation_input: GeolocatedEntryDTO) -> ExternResult<()> {
    let path = all_geolocations_path();

    path.ensure()?;

    let target_entry_hash = EntryHash::from(geolocation_input.entry_hash);
    let tag = GeolocationTag {
        latitude: geolocation_input.latitude,
        longitude: geolocation_input.longitude,
    };
    let sb = SerializedBytes::try_from(tag)?;

    create_link(path.hash()?, target_entry_hash, sb.bytes().clone())?;

    Ok(())
}

#[hdk_extern]
pub fn get_all_geolocated_entries(_: ()) -> ExternResult<Vec<GeolocatedEntryDTO>> {
    let path = all_geolocations_path();

    let links = get_links(path.hash()?, None)?;

    let geolocated_entries = links
        .into_inner()
        .into_iter()
        .map(|link| {
            let tag = link.tag.0;

            let sb = SerializedBytes::from(UnsafeBytes::from(tag));
            let geolocation_tag = GeolocationTag::try_from(sb)?;

            Ok(GeolocatedEntryDTO {
                entry_hash: link.target.into(),
                latitude: geolocation_tag.latitude,
                longitude: geolocation_tag.longitude,
            })
        })
        .collect::<ExternResult<Vec<GeolocatedEntryDTO>>>()?;

    Ok(geolocated_entries)
}

/** Helper */

fn all_geolocations_path() -> Path {
    Path::from("all_geolocations")
}
