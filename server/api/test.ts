export default defineEventHandler(async (event) => {// console.log('data', data)

    const email = process.env.API_AUTH_EMAIL
    const password = process.env.API_AUTH_PASSWORD

    const authHeader = Buffer.from(`${email}:${password}`).toString('base64')

    const dataApi = await $fetch('http://localhost:8000/api/query', {
        lazy: true,
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authHeader}`
        },
        body: {
            query: 'site().children',
            select: {
                'title' : true,
                'slug' : true,
                'contenu' : true,
                'show_in_nav' : true,
            }
        }
    })

    console.log('dataApi', dataApi)

    return {
        data: "test"
    }
})


