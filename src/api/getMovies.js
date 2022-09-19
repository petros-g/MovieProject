const ApiKey = '3e6dced6d51fbfd4714907f655567a4f';

export function getMovies(page = 1) {
  const ApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=en-US&page=${page}`;

  const data = fetch(ApiUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));

  return data;
}

export function getMovieDetails(id) {
  const ApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=en-US`;

  const data = fetch(ApiUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));

  return data;
}
