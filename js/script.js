// fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
// headers: {
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
// }
// })

const url = "https://striveschool-api.herokuapp.com/api/movies";

const options = {                
    headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
    }),
};

window.onload = () => {
    getGenres();
};

const arrayOfGenres = [];
const getGenres = async () => {
    // GET Method
    try {
        const response = await fetch(url, options);
        const genres = await response.json();
        genres.forEach((genre) => {
            arrayOfGenres.push(genre);
            getMovies(genre);
        });
    } catch (error) {
        console.log("a", error);
    }
};

const getMovies = async (genre) => {
    try {
        const response = await fetch(url + "/" + genre, options);
        const movieNode = await response.json();
        renderMovies(movieNode, genre);
    } catch (error) {
        console.log("b", error);
    }
};

const urlParams = new URLSearchParams(location.search);
const ID = urlParams.get("id");
console.log(ID);

const kidsMoviesContainer = document.querySelector("#kidsMoviesContainer > .row");

const dramaMoviesContainer = document.querySelector("#dramaMoviesContainer > .row");

const horrorMoviesContainer = document.querySelector("#horrorMoviesContainer > .row");

const otherMoviesContainer = document.querySelector("#otherMoviesContainer > .row");

const arrayOfMovies = []
const renderMovies = (arrayOfMovies, genre) => {
    let moviesContainer = null;
    switch (genre) {
        case "kids":
            moviesContainer = kidsMoviesContainer;
            break;
        case "drama":
            moviesContainer = dramaMoviesContainer;
            break;
        case "horror":
            moviesContainer = horrorMoviesContainer;
            break;
        }
        if (moviesContainer !== null) {
            moviesHTML = arrayOfMovies
            .map(({ name, description, imageUrl }) => {
                return `<div class="movie-card card" style="width: 10rem;">
                <img src="${imageUrl}" class="card-img-top">
                <div class="card-body">
                  <p class="card-title">${name}</p>
                  <div class="dropdown-divider"></div>
                  <p class="card-text">${description}</p>
                </div>
              </div>`;
            })
            .join("");
            moviesContainer.innerHTML = moviesHTML;
        }
};