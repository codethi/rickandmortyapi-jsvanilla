let page = 0;

async function getCharacters() {
  const resp = await fetch( `https://rickandmortyapi.com/api/character?page=${page + 1}`);
  const data = await resp.json();

  if(resp.status == 404){
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

async function viewMore() {
  page++;
  getCharacters();
}

// Scroll infinito
/* window.onscroll = function onScroll(e) {
  const scrollTop = e.target.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const scrollHeight = e.target.documentElement.scrollHeight;

  if (windowHeight + scrollTop * 2 >= scrollHeight) {
    viewMore();
  }

  window.onscroll = null;

  setTimeout(function () {
    window.onscroll = onScroll;
  }, 250);
}; */