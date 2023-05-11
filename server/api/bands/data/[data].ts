export default defineEventHandler(async (event) => {
   
    
    const link = event.context.params;
    console.log(link)
    console.log("vittu")

    try {

        //const html = await useFetch(link);
    } catch(e) {
        console.log(e)
    }
    
    //const test = await useFetch(`https://www.metal-archives.com/bands/2nd_Suicide/80998`);
    //console.log(test);
    
});