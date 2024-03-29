// @ts-nocheck
import cheerio from "cheerio";

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

export const getBandInfo = async (link : string) => {
    if(link) {
    try {
    const reg = link.match(/\d+$/);
    const id = reg?.toString();
    let route = `api/bands/data`;
    const { data } = await useFetch(route, { method: 'post', body: { url: link, id: id}});
    let $;
    let photo, logo, location, formYear, yearsActive;
    let albumsFinal = null;
    if(data.value.html) {
    $ = cheerio.load(data.value.html)
    photo = $('#photo').attr('href');
    logo = $('#logo').attr('href');
    location = $('#band_stats .float_left dt').nextAll().eq(2).text()
    formYear = $('#band_stats .float_left dt').nextAll().eq(6).text();
    yearsActive = $('#band_stats .clear dt').nextAll().eq(0).text()
    }
    if(data.value.discography) {
    $ = cheerio.load(data.value.discography);
    const albumLink:Array<string> = []
        const albumName:Array<string> = []
        const albumYear:Array<string> = []
        const albumType:Array<string> = []
        const albums:Array<Object> = []
        $("body > table > tbody > tr > td:nth-child(1) > a").each((index,element) => {albumName.push($(element.children).text())})
        $("body > table > tbody > tr > td:nth-child(2)").each((index,element) => {albumType.push($(element.children).text())})
        $("body > table > tbody > tr > td:nth-child(3)").each((index,element) => {albumYear.push($(element.children).text())})
        $("body > table > tbody > tr > td:nth-child(1) > a").each((index,element) => {albumLink.push(element.attribs.href)})
        for (let i = 0; i < albumName.length; i++) {albums.push({name:albumName[i], type:albumType[i], year:albumYear[i],link:albumLink[i]})}
        albumsFinal = Object.assign({}, albums);
    }

        const bandInfo = {
            "photo": photo,
            "logo": logo,
            "location": location,
            "formYear": formYear,
            "yearsActive": yearsActive,
            "albums" : albumsFinal
        }

        return bandInfo;
    } catch(e) {
        console.log(e);
    }
}
    
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