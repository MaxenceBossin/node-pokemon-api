exports.success = (message, data) =>  {return { message, data }}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pkm => pkm.id)
    const maxId = pokemons.reduce((a,b) => Math.max(a,b))
}
