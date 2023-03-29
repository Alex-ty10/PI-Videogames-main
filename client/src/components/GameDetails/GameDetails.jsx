import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getGameID } from '../../redux/actions';


const GameDetails = () => {
  //nos traemos id de params
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGameID(id)), [dispatch, id]
  })
  return (
    <div>GameDetails</div>
  )
}

export default GameDetails;