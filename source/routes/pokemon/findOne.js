const { Pokemon } = require('../../database/sequelize')
   
module.exports = (app) => {
  app.get('/api/pokemon/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
  })
}