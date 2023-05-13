// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    nitro: {
        plugins: ["~/server/index.ts"],        
    },
    runtimeConfig: {
        dbSocket: process.env.API_SOCKET,
        dbUser: process.env.API_USER,
        dbPassword: process.env.API_PW,
        dbDatabaseName: process.env.API_DB
    },
    app: {
        head: {
            title: "Black Metal World Map",
            meta: [{
                name: "description", content: "Browse metal bands from all around the world"
            }]
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt']
})
