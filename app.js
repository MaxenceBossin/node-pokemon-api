const express = require('express')
const app = express()
const port = 3000
const { success, getUniqueId } = require('./helper')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon')

/* Middleware */

app.use(favicon(__dirname + '/assets/image/favicon.ico'))
    .use(morgan('dev'))


app.get('/', (request, response) => response.send('Hello 🦊🦊🦊🦊'))
/* get  one */
app.get('/api/pokemon/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const pokemon = pokemons.find(pkm => pkm.id === id)
    const message = 'Un pokemon a été trouvé'
    response.json(success(message, pokemon))
})
/* get all */
app.get('/api/pokemons' , (request, response) => {
    const message = `Il y a ${pokemons.length} enregistrés en base`
    response.json(success(message, pokemons))
})
/* add */
app.post('/api/pokemon', (request, response) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...request.body, ...{id:id, created: new Date}}
    pokemons.push(pokemonCreated)
    const message = `${pokemonCreated.name} enregistrés en base`
    response.json(success(message, pokemonCreated))
})

/* up serve */
app.listen(port, () => console.log(`l'application est démarré sur le port ${port}`))
