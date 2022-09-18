export function getMovies(page = 2) {
  const ApiKey = '3e6dced6d51fbfd4714907f655567a4f';
  const ApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=en-US&page=${page}`;

  const data = fetch(ApiUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));

  return data;
}
