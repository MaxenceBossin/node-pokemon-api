exports.success = (message, data) =>  {return { message, data }}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pkm => pkm.id)
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b))
    return maxId + 1
}
