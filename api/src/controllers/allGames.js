const axios =  require ('axios');
const getApiData = require ('./getApiData');
const getDBData = require ('./getDBData');
const { Videogame, Genres } = require ('../db')
const {API_KEY} = process.env;
require('dotenv').config();
const Sequelize = require ('sequelize');
const op = Sequelize.Op;

//funcion buscadora por nombre en la API

async function nameAPI(name) {
  let searchAPIData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
  let apiData = [];
  searchAPIData.data.results.map(d => {
    apiData.push(
      {
        id: d.id,
        name: d.name,
        image: d.background_image,
        description: d.description_raw,
        released: d.released,
        rating: d.rating,
        platforms: d.platforms.map(p => p.platform.name),
        genres: d.genres.map(g => g.name),
        createdInDB: d.createdInDB
      }
    );
  });
  return apiData
};




//funcion buscadora por nombre en la DB
async function nameDB(name) {
  const searchGame = await Videogame.findAll({
    where: {
      name:{
        [op.iLike]: `%${name}%`
      }
    },
    include: [{
      model: Genres,
      attributes: ['name']
    }]
  })
  let NamegameDB = searchGame.map(d => {
    return {
            id: d.id,
            name: d.name,
            image: d.image,
            released: d.released,
            rating: d.rating,
            platforms: d.platforms,
            genres: d.genres.map(g => g.name),
            createdInDB: d.createdInDB
    }
  })
  return NamegameDB
};

module.exports = async function allGames(req, res, next) {
  const { name } =  req.query
  try {
    if(!name){
      let apiData = await getApiData();
      let DBData = await getDBData();
      if (!apiData && !DBData){
        console.log('no hay datos')
        return res.status(404).json({ msg: "We can't seem to find the page you're looking for"})
      }
      allData = [...DBData, ...apiData];
      console.log(allData.length +' hay datos los devuelvo');
      return allData
    };
    let apiDatan = await nameAPI(name);
    let DBDatan = await nameDB(name);
    if(!apiDatan && !DBDatan) {
      console.log('no hay datos me pasaron nombre')
      return res.status(400).json({ msg: "This game doesn't exist" })
    }
    let allDatan = [...DBDatan, ...apiDatan]
    let dataSlice = allDatan.slice(0, 15)
    console.log(dataSlice.length + ' datos nombres');
    return res.status(200).json(dataSlice)
  } catch (e) {
    return next(e)
  }
};
