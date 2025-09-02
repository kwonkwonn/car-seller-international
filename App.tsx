/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ResultsPanel } from './ResultsPanel';
import { fetchDealerships } from './geminiService';
import type { Dealership, Coordinates } from './types';

export const CAR_MODELS = ['Tesla Model 3', 'Hyundai Sonata', 'Kia EV6', 'Ford F-150', 'Toyota Camry'];

export function App() {
  const [country, setCountry] = useState('USA');
  const [postalCode, setPostalCode] = useState('');
  const [carModel, setCarModel] = useState(CAR_MODELS[0]);
  const [results, setResults] = useState<Dealership[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mapCenter, setMapCenter] = useState<Coordinates | null>(null);
  const [mapZoom, setMapZoom] = useState(10);
  const [selectedDealership, setSelectedDealership] = useState<Dealership | null>(null);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode) {
      setError('Please enter a postal code.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setMapCenter(null);
    setSelectedDealership(null);

    try {
      const fetchedResults = await fetchDealerships(carModel, postalCode, country);
      setResults(fetchedResults);

      if (fetchedResults && fetchedResults.length > 0) {
        const firstDealership = fetchedResults[0];
        setMapCenter({ lat: firstDealership.latitude, lng: firstDealership.longitude });
        setSelectedDealership(firstDealership);
        setMapZoom(10);
      }

    } catch (err) {
      console.error(err);
      setError('Failed to fetch results. The AI may be busy, or the request was invalid. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealershipSelect = (dealership: Dealership) => {
    setSelectedDealership(dealership);
    setMapCenter({ lat: dealership.latitude, lng: dealership.longitude });
    setMapZoom(14); // Zoom in on selection
  };

  return (
    <div className="app-container">
      <Sidebar
        country={country}
        setCountry={setCountry}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        carModel={carModel}
        setCarModel={setCarModel}
        handleSearch={handleSearch}
        isLoading={isLoading}
        carModels={CAR_MODELS}
      />
      <ResultsPanel
        isLoading={isLoading}
        error={error}
        results={results}
        country={country}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        selectedDealership={selectedDealership}
        onDealershipSelect={handleDealershipSelect}
      />
    </div>
  );
}
