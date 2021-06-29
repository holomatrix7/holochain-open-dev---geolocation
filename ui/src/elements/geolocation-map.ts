import { css, html, LitElement } from 'lit';
import { state, property, query } from 'lit/decorators.js';

import { requestContext } from '@holochain-open-dev/context';

import { sharedStyles } from '../sharedStyles';
import { GeolocatedEntryDTO, TODO_REPLACE_NAME_CONTEXT } from '../types';
import { GeolocationService } from '../geolocation.service';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import L from 'leaflet';

// TODO: create your own elements

/**
 */
export class GeolocationMap extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /** Dependencies */

  @requestContext(TODO_REPLACE_NAME_CONTEXT)
  _geolocationService!: GeolocationService;

  /** Private properties */

  @state() _allGeolocatedEntries: Array<GeolocatedEntryDTO> = [];

  @query('#map')
  _mapEl!: HTMLElement;

  async firstUpdated() {
    this._allGeolocatedEntries =
      await this._geolocationService.getAllGeolocatedEntries();
    const map = L.map(this._mapEl).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    for (const geolocatedEntry of this._allGeolocatedEntries) {
      L.marker([geolocatedEntry.latitude, geolocatedEntry.longitude]).addTo(
        map
      );
    }
  }

  render() {
    return html` <div id="map"></div> `;
  }

  createRenderRoot() {
    return this;
  }

  static get styles() {
    return css`
      
    `;
  }
}
