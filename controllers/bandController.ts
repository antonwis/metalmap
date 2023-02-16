type QueryObject = {
    country: String,
    name: String,
    genre: String,
    status: String,
}

/**
 * Fetch all bands from database
 * @returns band data
 */
export const getBands = () => {
    return useFetch("/api/bands")
}

/**
 * Fetch all bands from a specific country or countries matching the string
 * @param country Name of country, can be a partial string
 * @returns filtered band data 
 */
export const getBandsInCountry = async (country : String) => {
    if (country === "Czech Rep.") country = "Czechia";
    country = country.replace(" ", "_")
    const { data } = await useFetch(`/api/bands/country/${country}`);
    return data;
}

/**
 * Fetch bands based on query filters e.g. country, name, genre or status
 * @param filters Object containing filtering params
 * @returns filtered band data
 */
export const queryBands = async (filters : QueryObject) => {
    let { country, name, genre, status } = filters;
    if (country === "Czech Rep.") country = "Czechia";
    country = country.replace(" ", "_");
    let route = `/api/bands`;
    if(country) route += `/country/${country}`;

    if(name && genre && status) return await useFetch(route, { query: { name: name, genre: genre, status: status }});
    if(name && genre) return await useFetch(route, { query: { name: name, genre: genre }});
    if(name) return await useFetch(route, { query: { name: name }});
    if(genre) return await useFetch(route, { query: { genre: genre }});
    if(status) return await useFetch(route, { query: { status: status }});
    return await useFetch(route);
}

/*
export const queryBandsInCountry = async (country: String, payload : QueryObject) => {
    const { name, genre, status } = payload;

    if(name && genre && status) return await useFetch(`/api/bands/country/${country}`, { query: { name: name, genre: genre, status: status }});
    if(name && genre) return await useFetch(`/api/bands/country/${country}`, { query: { name: name, genre: genre }});
    if(name) return await useFetch(`/api/bands/country/${country}`, { query: { name: name }});
    if(genre) return await useFetch(`/api/bands/country/${country}`, { query: { genre: genre }});
    if(status) return await useFetch(`/api/bands/country/${country}`, { query: { status: status }});
}
*/