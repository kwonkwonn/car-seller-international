/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';

interface SidebarProps {
    country: string;
    setCountry: (country: string) => void;
    postalCode: string;
    setPostalCode: (code: string) => void;
    carModel: string;
    setCarModel: (model: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    isLoading: boolean;
    carModels: string[];
}

export function Sidebar({
    country, setCountry, postalCode, setPostalCode, carModel, setCarModel, handleSearch, isLoading, carModels
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1>Auto Comparator</h1>
                <p>Find new car prices in your area</p>
            </div>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="USA">USA</option>
                        <option value="South Korea">South Korea</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input
                        type="text"
                        id="postal-code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder={country === 'USA' ? 'Enter ZIP Code' : '우편번호 입력'}
                        aria-label="Postal Code Input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="car-model">Car Model</label>
                    <select id="car-model" value={carModel} onChange={(e) => setCarModel(e.target.value)}>
                        {carModels.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="search-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Find Deals'}
                </button>
            </form>
        </aside>
    );
}
