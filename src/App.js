import React, { useEffect, useState } from "react"
import "./App.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { Navbar, Form, Container } from "react-bootstrap"
import { BrowserRouter as Router, NavLink } from "react-router-dom"
import Movie from "./components/Movie"

let api = 0

let App = () => {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [loaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [apiChoice, setApiChoice] = useState(0)
  const apiRoot = "https://api.themoviedb.org/3/movie"
  const apiSearchRoot = "https://api.themoviedb.org/3/search"
  const accessKey = process.env.REACT_APP_MOVIE_API_KEY
  const [searchYes, setSearchYes] = useState(false)

  switch (apiChoice) {
    case 1:
      api = `${apiRoot}/popular?api_key=${accessKey}&language=en-US&page=${page}` //Popular
      break
    case 2:
      api = `${apiRoot}/top_rated?api_key=${accessKey}&language=en-US&page=${page}` //Top Rated
      break
    case 3:
      api = `${apiRoot}/upcoming?api_key=${accessKey}&language=en-US&page=${page}` //Upcoming
      break
    case 0:
      api = `${apiRoot}/now_playing?api_key=${accessKey}&language=en-US&page=${page}` //Default which is Now Playing
      break
    default:
      api = `${apiRoot}/now_playing?api_key=${accessKey}&language=en-US&page=${page}`
  }

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      })
  }, [apiChoice])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = (page) => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, ...data.results])
        setIsLoaded(true)
      })
  }

  const handleSubmit = (e) => {
    setSearchYes(true)
    e.preventDefault()
    window.scrollTo(0, 0)
    if (searchTerm) {
      fetch(`${apiSearchRoot}/movie?api_key=${accessKey}&language=en-US&page=${page}&query=` + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results)
        })
      setSearchTerm("")
    }
  }

  function handleChange(e) {
    setSearchTerm(e.target.value)
    setApiChoice(4)
    setPage(1)
  }

  return (
    <Router>
      <div className="app">
        <Navbar expand="lg" sticky="top" variant="dark">
          <Container>
            <NavLink
              className="headerBrand"
              to="/"
              style={{ color: "#f0ad4e" }}
              onClick={() => {
                window.scrollTo(0, 0)
                setPage(1)
                setApiChoice(0)
              }}
            >
              Cinematix
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavLink
                className="headerLink"
                activeClassName="activeLink"
                to="/popular"
                onClick={() => {
                  window.scrollTo(0, 0)
                  setPage(1)
                  setApiChoice(1)
                }}
              >
                Popular
              </NavLink>
              <NavLink
                className="headerLink"
                activeClassName="activeLink"
                to="/top_rated"
                onClick={() => {
                  window.scrollTo(0, 0)
                  setPage(1)
                  setApiChoice(2)
                }}
              >
                Top Rated
              </NavLink>
              <NavLink
                className="headerLink"
                activeClassName="activeLink"
                to="/upcoming"
                onClick={() => {
                  window.scrollTo(0, 0)
                  setPage(1)
                  setApiChoice(3)
                }}
              >
                Upcoming
              </NavLink>
              <Form onSubmit={handleSubmit} className="headerInput" inline>
                <Form.Group controlId="formSearch">
                  <Form.Control type="search" placeholder="Search..." value={searchTerm} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="pageTitle"></div>
        <div>
          <InfiniteScroll
            dataLength={movies}
            next={() => {
              if (searchYes) {
                setSearchYes(false)
              } else {
                setPage(page + 1)
                fetchMovies(page)
              }
            }}
            hasMore={true}
            loader={<h4></h4>}
          >
            <div className="movieContainer">{movies.length > 0 && movies.map((movie, index) => <Movie {...movie} key={index} />)}</div>
          </InfiniteScroll>
        </div>
      </div>
    </Router>
  )
}

export default App
