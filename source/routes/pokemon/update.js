const { Pokemon } = require('../../database/sequelize')

module.exports = (app) => {
      app.put('/api/pokemon/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
          where: { id: id }
        })
        .then(_ => {
          Pokemon.findByPk(id).then(pokemon => {
            const message = `Le pokémon ${pokemon.name} a bien été modifié.`
            res.json({message, data: pokemon })
          })
        })
      })
    }