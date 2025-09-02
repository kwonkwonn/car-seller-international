/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dealership {
  dealershipName: string;
  address: string;
  price: number;
  currency: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
