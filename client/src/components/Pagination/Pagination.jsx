import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';


const Pagination = ({ gamesPerPage, allVideoGames, Pagination}) => {
  const pageNumber = [];
  let page = Math.ceil(allVideoGames / gamesPerPage);
  for (let i = 0; i < page; i++) {
    pageNumber = [];
  }
  return (
    <div>
      <nav className='c.pagination'>
        {pageNumber && 
          pageNumber.map((number) => {
            <span key={number}>
              <button className={c.btn} onClick={() => pagination(number)}>
                {number}
              </button>{" "}
            </span>
        })}

      </nav>
    </div>
  )
}

export default Pagination;