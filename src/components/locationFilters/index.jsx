"use client"

import { useLocationContext } from '@/context/LocationContext';
import CountrySearch from './CountrySearch';
import styles from './locationFilters.module.css';
import regionsDetails from './regionsDetails.json';
import RegionsSearch from './RegionsSearch';

const LocationFilters = () => {
    const { setLocationFilters } = useLocationContext();
    
    const handleLocationSelect = (e) => {
        const selectedRegion = regionsDetails.find(
            (regionsDetail) => regionsDetail.region === e.target.value
        );

        if (selectedRegion)
            setLocationFilters((prevFilters) => ({
                ...prevFilters,
                minLatitude: selectedRegion.minLatitude,
                minLongitude: selectedRegion.minLongitude,
                maxLatitude: selectedRegion.maxLatitude,
                maxLongitude: selectedRegion.maxLongitude,
            }));
    };
    
    const handleCountrySelect = (country) => {
        setLocationFilters((prevFilters) => ({
            ...prevFilters,
            country: country,
        }));
    };

    return (
        <div className={styles.locationFiltersContainer}>
            <RegionsSearch onSelect={handleLocationSelect} />
            <CountrySearch onSelect={handleCountrySelect} />
        </div>
    );
};

export default LocationFilters;