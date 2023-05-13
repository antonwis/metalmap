export default defineEventHandler(async (event) => {
   
    const {url, id} = await readBody(event);
    console.log(url + " URL TOIMII!");
    try{
    let html: any = await $fetch(url);
    let discography = await $fetch(`https://www.metal-archives.com/band/discography/id/${id}/tab/all`)
    //console.log(html);
    const data = {
        html: html,
        discography: discography
    }
    return data;
}
catch(e) {
    console.log(e);
}
   
});