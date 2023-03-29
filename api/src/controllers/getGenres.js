const axios = require ('axios');
require('dotenv').config();
const { Genres } = require ('../db');
const { API_KEY } = process.env;

module.exports = async function getGenres (req, res, next) {

  try {
    // Traemos los generes de la API
    const  genresApi= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const dataApi = genresApi.data.results;

    //Creamos los generos traidos de la API en la DB
     /* let Data = Genres.findAll();
     if(!Data.length) await Genres.bulkCreate(dataApi) */


    dataApi.map((d) => {
      Genres.findOrCreate({
        where: { name: d.name,
                 id: d.id
                }
      });
    });
    const allGenres = await Genres.findAll();
    console.log(allGenres.length + ' Todo bien');
    return res.json(allGenres);
    
  } catch (e) {
    return next(e)
  }
};


