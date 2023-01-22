// fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {

// headers: {
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
// }
// })

const url = "https://striveschool-api.herokuapp.com/api/movies"

window.onload = () => {
    getCategories();
};

const options = {                
    headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
    }),
};

const postData = async(movie) => {
    try {
        let res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
            },
        });
    } catch(error) {
        console.log(error)
    }
}

const submitMovie = () => {
    let movie = {
        name: document.querySelector("#nameId").value,
        description: document.querySelector("#descriptionId").value,
        category: document.querySelector("#categoryId").value,
        imageUrl: document.querySelector("#imageUrlId").value,
    };
    postData(movie);
};

const params = new URLSearchParams(location.search)
const iD = params.get("id");
const editMoviesContainer = document.querySelector("#editMoviesContainer");

const arrayOfCategories = [];
const getCategories = async () => {
    try {
        const res = await fetch(url, options);
        const categories = await res.json();
        categories.forEach((category) => {
            arrayOfCategories.push(category);
            getMovies(category);
        });
    } catch (error) {
        console.log(error);
    }
};

const arrayOfMovies = [];
const getMovies = async (category) => {
    try {
        const res = await fetch(url + "/" + category, options);
        const movieNode = await res.json();
        movieNode.forEach((movie) => {
            arrayOfMovies.push(movie);
        });
        renderMoviesBackOffice(movieNode, category);
    } catch (error) {
        console.log(error);
    }
}

const renderMoviesBackOffice = (arrayOfMovies, category) => {
    const grab = document.querySelector(`#${category}Container`);
    if (grab === null) {
        const tableNode = document.createElement("div");
        tableNode.className = "container";
        tableNode.id = `${category}Container`;
        tableNode.innerHTML = "";
        tableNode.innerHTML = `
        <div class="row">
        <div class="col">
          <table class="table">
            <thead>
            <th scope="col">Image</th>
            <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Genre: ${category}</th>
              <th scope="col"></th>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>`;
        editMoviesContainer.appendChild(tableNode)

        const tableContent = document.querySelector(`#${category}Container tbody`);

        const moviesHTML = arrayOfMovies.map(({ name, imageUrl, _id}) => {
            return `<tr>
            <td><img src="${imageUrl}" style="object-fit:cover; width:60px; height: 60px"></td>
            <td>${_id}</td>
            <td>${name}</td>
            <td>${category}</td>
            
            <td>
            
            
            <div>
                <button type="button" class="btn btn-primary" onclick="editMovie()">EDIT</button>
                <button type="button" class="btn btn-danger" onclick="deleteMovie('${_id}')">DELETE</button>         
            </div>
            </td>
        </tr>`;

        })
        .join("");
        tableContent.innerHTML = moviesHTML;
    }
}

const deleteOptions = {
    method: "DELETE",
   headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2Y0OGU3MzczODAwMTUzNzQzOWQiLCJpYXQiOjE2NzQyMDg3OTUsImV4cCI6MTY3NTQxODM5NX0.ztuggPMbDjIkPpQXr_BbaGYASuaXYR8TS8ORHPBaL4k"
    }),
}

const deleteMovie = async (id) => {
    try {
        const res = fetch(`${url}/${id}`, deleteOptions).then((response) => {
            if (res.ok) {
                location.reload();
            } else {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error);
    }
};

// need to refresh for deleted to be removed from page

// PUT Method still to do