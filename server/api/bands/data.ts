export default defineEventHandler(async (event) => {
   
    const {url, id} = await readBody(event);
    let html: any;
    let discography: any;
    try{
    html = await $fetch(url);
    } catch(e) {
        html = null;
    }
    try {
        discography = await $fetch(`https://www.metal-archives.com/band/discography/id/${id}/tab/all`)
    } catch(e) {
        discography = null;
    }
    const data = {
        html: html,
        discography: discography
    }
    return data;
});