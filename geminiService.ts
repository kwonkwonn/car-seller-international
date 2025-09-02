/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI, Type } from "@google/genai";
import type { Dealership } from './types';
import { GEMINI_API_KEY } from './config';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function fetchDealerships(
    carModel: string,
    postalCode: string,
    country: string
): Promise<Dealership[]> {
    const prompt = `You are an automotive market analyst AI. A user is looking for new car prices for a ${carModel} in the area around postal code "${postalCode}" in ${country}. Provide a list of 3-5 fictional but realistic dealerships in that area. For each dealership, provide its name, a plausible full address, the Manufacturer's Suggested Retail Price (MSRP) for a base trim level of the car, its currency (e.g. USD or KRW), and its precise latitude and longitude.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dealershipName: {
                  type: Type.STRING,
                  description: 'The fictional name of the car dealership.',
                },
                address: {
                  type: Type.STRING,
                  description: 'The complete, plausible address of the dealership.',
                },
                price: {
                  type: Type.NUMBER,
                  description: 'The MSRP for the specified car model.',
                },
                currency: {
                    type: Type.STRING,
                    description: 'The currency code (e.g., USD or KRW).',
                },
                latitude: {
                    type: Type.NUMBER,
                    description: 'The latitude of the dealership location.'
                },
                longitude: {
                    type: Type.NUMBER,
                    description: 'The longitude of the dealership location.'
                }
              },
              required: ['dealershipName', 'address', 'price', 'currency', 'latitude', 'longitude'],
            },
          },
        },
      });

      const parsedResults = JSON.parse(response.text);
      return parsedResults as Dealership[];
}