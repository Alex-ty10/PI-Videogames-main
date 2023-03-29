import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '/GameCard.css'

const GameCard = ({ id, name, image, rating, genres }) => {
  return (
    <>
      <div className='GCard'>

        {
          image ? 
            <img className='imageG' src={image} alt='No image'/>
            :
            <img className='imageG'  alt='busca una imagen para este error'/>
        }
        <div className='cardtext'>
          <p className='Title'>{name}</p>
          <p className='text'>{genres.join(', ')}</p>
          <p className='text'>{rating}</p>
        </div>
        <NavLink className='buttonmore' to={`/game/${id}`}>
          <button>See more</button>
        </NavLink>

      </div>
    </>
  )
}

export default GameCard;