const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const { Videogame, Genres } = require ('../db')

async function searchID(id) {
  try {
     //pregunto si el id posee un -, ya que los ids creados con uudi4 los poseen y los de la API no
     if(id.includes('-')){
      let searchDB = await Videogame.findOne({
        where: {id: id},
        include: {
          model: Genres,
          attributes: ['name']
        }
      })
      let foundGameDB = {
            id: searchDB.id,
            name: searchDB.name,
            image: searchDB.image,
            description: searchDB.description,
            released: searchDB.released,
            rating: searchDB.rating,
            platforms: [ searchDB.platforms ],
            genres: searchDB.genres.map(g => g.name),
      }
      return foundGameDB
     }
     let searchApiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
     let foundGameApi = {
            id: searchApiId.data.id,
            name: searchApiId.data.name,
            image: searchApiId.data.image,
            released: searchApiId.data.released,
            rating: searchApiId.data.rating,
            platforms: searchApiId.data.platforms.map(p => p.platform.name),
            genres: searchApiId.data.genres.map(g => g.name)
     }
     return foundGameApi

  } catch (e) {
    console.log(e)
  }
};

module.exports = async function getDataID(req, res, next) {
  try {
    const { id } = req.params;
    let game =  await searchID(id);
    if(!game) return res.status(404).json({ msg:"We couldn't find your game" });
    return res.status(200).json(game)
  } catch (e) {
    return next(e)
  };
};