import {
  GET_ALL_GAMES,
  GET_GAME_ID,
  GET_GAME_NAME,
  CREATE_GAME,
  GET_GENRES,
  ORDER_BY_NAME,
  ORDER_BY_GENRES,
  ORDER_BY_RATING,
  ORDER_BY_SOURCE
} from './actions';

const inicialSate = {
  allVideoGames: [],
  videogames: [],
  videogame: [],
  genres: [],
  platforms: [],
}

function rootReducer(state = inicialSate, action){

  switch (action.type) {
    case GET_ALL_GAMES:
      let platforms = [];
      action.payload.map(g => platforms = [...platforms, ...e.platforms]);
      return {
        ...state,
        allVideoGames: action.payload,
        videogames: action.payload,
        platforms: Array.from(new Set(platforms))
      }

      case GET_GAME_ID:
        return{
          ...state,//copia estado importante no olvidar
          videogame: action.payload
        }

        case GET_GAME_NAME:
        return{
          ...state,
          allVideoGames: action.payload
        }

        case CREATE_GAME:
        return{
          
        }

        case GET_GENRES:
        return{
          ...state,
          genres: action.payload
        }

        case ORDER_BY_NAME:
          const orderingName = action.payload === 'A-Z' ?
          state.videogames.sort((a ,b) => {
            if(a.name,toLowerCase() > b.name.toLowerCase()) return 1
            if(b.name,toLowerCase() > a.name.toLowerCase()) return -1
            return 0
          })
          :
          state.videogames.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
            return 0
          })
          return {
            ...state,
            videogames: orderingName,
          }
          

        case ORDER_BY_GENRES:
        return{
          
        }

        case ORDER_BY_RATING:
          const orderingRating = action.payload === 'High to Low' ?
          state.videogames.sort((a, b) => Number(b.rating) - Number(a.rating))
          :
          state.videogames.sort((a, b) => Number(a.rating) - Number(b.rating))
          return{
            ...state,
            videogames: orderingRating
          }
        

        case ORDER_BY_SOURCE:
          const getVideoGames = state.allVideoGames
          const filterVG = action.payload === 'DB' ? getVideoGames.filter(g => g.createdInDB)
          : getVideoGames.filter(e => !e.createdInDB)
        return{
          ...state,
          videogames: action.payload === 'All games' ? getVideoGames : filterVG
        }
  
    default: return state
  }
}

export default rootReducer