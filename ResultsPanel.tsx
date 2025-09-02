/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Map } from './Map';
import type { Dealership, Coordinates } from './types';

interface ResultsPanelProps {
    isLoading: boolean;
    error: string | null;
    results: Dealership[] | null;
    country: string;
    mapCenter: Coordinates | null;
    mapZoom: number;
    selectedDealership: Dealership | null;
    onDealershipSelect: (dealership: Dealership) => void;
}

export function ResultsPanel({
    isLoading, error, results, country, mapCenter, mapZoom, selectedDealership, onDealershipSelect
}: ResultsPanelProps) {
    return (
        <main className="main-content">
            {isLoading && <div className="loader" aria-label="Loading results"></div>}
            {error && <div className="error-message" role="alert">{error}</div>}
            {results && mapCenter && (
                <div className="results-container">
                    <Map
                        country={country}
                        center={mapCenter}
                        zoom={mapZoom}
                        markers={results}
                        selectedMarker={selectedDealership}
                    />
                    <div className="dealership-list">
                        {results.map((deal, index) => (
                            <div
                                key={index}
                                className={`dealership-card ${selectedDealership?.dealershipName === deal.dealershipName ? 'selected' : ''}`}
                                onClick={() => onDealershipSelect(deal)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && onDealershipSelect(deal)}
                            >
                                <h4>{deal.dealershipName}</h4>
                                <p>{deal.address}</p>
                                <p className="price">
                                    {new Intl.NumberFormat(country === 'USA' ? 'en-US' : 'ko-KR', {
                                        style: 'currency',
                                        currency: deal.currency,
                                    }).format(deal.price)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!isLoading && !results && !error && (
                <div className="placeholder-content">
                    <h2>Compare Prices Instantly</h2>
                    <p>Select your region and vehicle to start.</p>
                </div>
            )}
        </main>
    );
}