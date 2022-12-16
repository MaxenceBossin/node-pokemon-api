const express = require('express')
const app = express()
const port = 3000
const { success, getUniqueId } = require('./helper')
const { Sequelize, DataTypes } = require('sequelize')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon')
const PokemonModel = require('./source/models/pokemon')

/* co bdd */
const sequelize = new Sequelize(
    'pokemonApi', // nom bdd
    'root', // id
    '', // psw
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions:{
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)
sequelize.authenticate()
    .then( _ => console.info('Connexion réussi'))
    .catch( error => console.error(`Connexion raté ${error}`))
const Pokemon = PokemonModel(sequelize, DataTypes)
sequelize.sync({force: true}) // Crée la bdd
    .then(_ => {
        console.log('La bdd à été mise à jour')

        pokemons.map(pkm => {
            Pokemon.create({
                name: pkm.name,
                hp: pkm.hp,
                cp: pkm.cp,
                picture: pkm.picture,
                types: pkm.types.join()
            }).then(pkm => console.log(pkm.toJSON()))
        })
    })

/* Middleware */

app
    .use(favicon(__dirname + '/assets/image/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())


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
/* put */
app.put('/api/pokemon/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const oldName = pokemons[id-1].name
    const pokemonUpdated = {...request.body, id:id}
    pokemons.map(pkm => {
        return pkm.id === id ? pokemonUpdated : pkm
    })
    const message = `${oldName} a été modifié par ${pokemonUpdated.name} en base`
    response.json(success(message, pokemonUpdated))
})
/* delete */
app.delete('/api/pokemon/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const pokemonDeleted = pokemons.find(pkm => pkm.id === id)
    pokemons.filter(pkm => pkm.id !== id)
    
    const message = `${pokemonDeleted.name} a été supprimé`
    response.json(success(message, pokemonDeleted))
})
/* up serve */
app.listen(port, () => console.log(`l'application est démarré sur le port ${port}`))
