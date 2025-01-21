const PHOTON_BASE_URL = 'https://photon.komoot.io/api/?';

export const getSearchOptions = async (inputValue) => {
    const params = {
        q: inputValue,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch(`${PHOTON_BASE_URL}${queryString}`, requestOptions);
        const data = await response.json();
        const { features } = data;
        return features;
    } catch (err) {
        console.error("Error in fetching search options from photon:", err);
        throw err;
    }
};