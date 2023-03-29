const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env;


module.exports = async function getApiData(){
  
  try {
    let URL = `https://api.rawg.io/api/games?key=${API_KEY}`
    let apiData= [];
    for (let i = 0; i < 5; i++) {
      let pages = await axios.get(URL);
      pages.data.results.map(d => {
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
            createdInDB: false,
          }
        );
      });
      URL = pages.data.next
    }
    console.log(apiData,'Data traida con exito')
    return apiData
  } catch (e) {
    console.log(e)
  }
};







