import { useEffect, useState } from "react";
import countries from './countries.json';
import styles from './countrySearch.module.css';

const CountrySearch = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        if (searchTerm.length > 0)
            setFilteredCountries(() => {
                return countries.filter((country) =>
                    country.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelect = (country) => {
        setSearchTerm(country);
        setFilteredCountries([]);
        onSelect(country);
    };

    return (
        <div className={styles.countrySearchContainer}>
            <div className={styles.countrySearchLabel}>Countries</div>
            <input
                placeholder="Search for a country"
                value={searchTerm}
                onChange={handleChange}
                className={styles.countrySearchInput}
            />
            <ul className={styles.countrySearchList}>
                {filteredCountries.map((country, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(country)}
                        className={styles.countrySearchItem}
                    >{country}</li>
                ))}
            </ul>
        </div>
    );
};

export default CountrySearch;