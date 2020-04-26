import React from 'react'

export const Pagination = ({moviesPerPage, totalMovies, paginate, prepage, nextpage}) => {
    const pageNumbers =[];

    for(let i=1; i<= Math.ceil(totalMovies / moviesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">

                <li className="page-item">
                <button className="page-link" onClick={() => prepage()} >Previous</button>
                </li>
                {pageNumbers.map(number =>(
                   
                   <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                    
                ))}
                <li class="page-item">
                <button class="page-link" onClick={() => nextpage()}>Next</button>
                </li>

            </ul>
        </nav>
    )
}
