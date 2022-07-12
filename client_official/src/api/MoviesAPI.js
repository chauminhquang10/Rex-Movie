import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesAPI = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCallback, setMoviesCallback] = useState(false);

  //using for filter movies
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        //Lay 20 movie, sau khi da update list se chinh thanh 9
        `/api/movies?${genre}&${sort}&${year}&title[regex]=${search}`
      );
      setMovies(res.data.movies);
      setResult(res.data.result);
    };
    getMovies();
  }, [moviesCallback, genre, sort, search, year]);

  return {
    movies: [movies, setMovies],
    moviesCallback: [moviesCallback, setMoviesCallback],
    genre: [genre, setGenre],
    year: [year, setYear],
    sort: [sort, setSort],
    search: [search, setSearch],
    // page: [page, setPage],
    result: [result, setResult],
  };
};

export default MoviesAPI;
