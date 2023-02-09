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
    }
})
