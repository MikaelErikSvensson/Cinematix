import React from "react"

const imgApi = "https://image.tmdb.org/t/p/w500/"

function setVoteClass(vote) {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 6) {
    return "yellow"
  } else if (vote >= 4) {
    return "orange"
  } else {
    return "red"
  }
}

function Movie({ title, poster_path, overview, vote_average, release_date }) {
  return (
    <div className="movie">
      <img src={poster_path ? imgApi + poster_path : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"} alt={title} />
      <div className="movieInfo">
        <h4>{title}</h4>
        <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
      </div>
      <div className="movieHover">
        <h2>Overview:</h2>
        <p>{overview}</p>
        <p className="releaseDate">Year of release: {release_date}</p>
      </div>
    </div>
  )
}

export default Movie
