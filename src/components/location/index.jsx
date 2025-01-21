"use client"
import { useEffect, useState } from "react";
import { getSearchOptions } from "./SearchBarService";
import SearchOptionsList from "./SearchOptionsList.jsx";
import styles from './location.module.css';

const Location = ({ selectedSearchOption, setSelectedSearchOption }) => {
    const [inputValue, setInputValue] = useState("");
    const [searchOptions, setSearchOptions] = useState([]);

    useEffect(() => {
        const fetchSearchOptions = async () => {
            try {
                const data = await getSearchOptions(inputValue);
                setSearchOptions(data);
            } catch (err) {
                alert(`Error in fetching searchOptions, ${err.message}`);
            }
        }
        if (inputValue)
            fetchSearchOptions();
    }, [inputValue]);

    const handleInputValueChange = (e) => {
        setInputValue(e.target.value);
        setSelectedSearchOption(null);
    };

    const handleSelectSearchOption = (searchOption) => {
        setSelectedSearchOption(searchOption);
        setInputValue(`${searchOption?.properties?.country}, ${searchOption?.properties?.name}`);
        setSearchOptions([]);
    };
    return(
        <div>
            <div>Location:</div>
            <input
                placeholder = "Enter Location"
                value={inputValue}
                onChange={handleInputValueChange}
                className={styles.input}
            />
            {searchOptions?.length > 0 && !selectedSearchOption && (
                <SearchOptionsList
                    searchOptions={searchOptions}
                    onSelectSearchOption={handleSelectSearchOption}
                />
            )}
            {selectedSearchOption && (
                <div>
                    Selected Location: {selectedSearchOption?.properties?.country}, {selectedSearchOption?.properties?.name}
                </div>
            )}
        </div>
    );
};

export default Location;