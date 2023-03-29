const { Videogame, Genres } = require('../db.js');

module.exports = async function getDBData() {
  try {
    const videoG = await Videogame.findAll({
      include: [{
        model: Genres,
        through:{
          atributes: ['name']
        }
      }]
    })
    let data = videoG.map(v => {
      return {
        name: v.name,
        id: v.id,
        image: v.image,
        description: v.description,
        released: v.released,
        rating: v.rating,
        platforms: v.platforms,
        genres: v.genres.map(g => g.name),
        createdInDB: v.createdInDB
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
};