const { Pokemon } = require('../../database/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemon', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
  })
}