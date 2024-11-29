/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Response type from Scryfall symbology API call.
 */

/**
 * @see https://scryfall.com/docs/api/card-symbols
 */
export interface SymbologySymbol {
  object: "card_symbol";
  symbol: string;
  svg_uri: string;
  loose_variant: string | null;
  english: string;
  transposable: boolean;
  represents_mana: boolean;
  appears_in_mana_costs: boolean;
  mana_value: number;
  hybrid: boolean;
  phyrexian: boolean;
  cmc: number;
  funny: boolean;
  colors: string[];
  gatherer_alternates: string[];
}

export interface SymbologyResponse {
  object: "list";
  has_more: false;
  data: SymbologySymbol[];
}
