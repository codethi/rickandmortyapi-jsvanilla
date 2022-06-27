let page = 1;

async function getCharacters() {
  const resp = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await resp.json();

  if (resp.status == 404) {
    document.querySelector("#more").style.display = "none";
  }

  data.results.forEach((character) => {
    document.querySelector("#character-list").insertAdjacentHTML(
      "beforeend",
      `<div class="card">
            <img class="image-character" src=${
              character.image
            } alt=${`Imagem do ${character.name}`} />
            <div>
                <h2 class="name-character">${character.name}</h2>
                <p class="species-character">${character.species}</p>
                <h4>Gender</h4>
                <p class="species-character">${character.gender}</p>
                <h4>Origin</h4>
                <p class="species-origin">${character.origin.name}</p>
            </div>
        </div>
        `
    );
  });
}

getCharacters();

function viewMore() {
  page++;
  getCharacters();
}

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 200) {
    viewMore();
  }
});