"use client"

import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locationFilters, setLocationFilters] = useState({
        country: "",
        name: "",
        minLatitude: null,
        minLongitude: null,
        maxLatitude: null,
        maxLongitude: null,
    });

    return (
        <LocationContext.Provider value={{ locationFilters, setLocationFilters }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);