import React from 'react'

function Search ({ handleInput, search }) {
	return (
		<section className="searchbox-wrap">
			<center><input 
				type="text" 
				placeholder="Search Movies" 
				className="searchbox" 
				onChange={handleInput}
				onKeyPress={search}
			/></center>
		</section>
	)
}

export default Search
