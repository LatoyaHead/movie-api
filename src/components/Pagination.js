import React from 'react'

const Pagination = ({pages, setPages, totalPages, title}) => {
  return (
    <>
      <h1 className='movie-category'>{title.replace('_', ' ')}</h1>
      <div className="page-btn-container">
        <button onClick={() => setPages(pages- 1) } disabled={pages=== 1} className="page-btn">Previous</button>
          <p className="page-text">Page {pages}</p>
        <button onClick={() => setPages(pages + 1) } disabled={pages === totalPages} className="page-btn">Next</button>
      </div>
    </>
  )
}

export default Pagination 
