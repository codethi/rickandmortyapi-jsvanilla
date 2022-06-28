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
                <span>${character.id}</span>
            </div>
        </div>
        `
    );
  });

  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector("#modal-overlay");

  cards.forEach((card) => {
    card.addEventListener("click", async function (event) {
      const cardElement = event.path.filter((item) => item.className == "card");
      const idCard = cardElement[0].children[1].children[6].innerHTML;

      console.log(event);

      const resp = await fetch(
        `https://rickandmortyapi.com/api/character/${idCard}`
      );
      const data = await resp.json();

      modal.style.display = "flex";

      modal.insertAdjacentHTML(
        "beforeend",
        `<div class="modal modal-item">
              <span id="close-modal">x</span>
              <img class="modal-item" src=${
                data.image
              } alt=${`Imagem do ${data.name}`} />
              <div>
                  <h2 class="modal-item">${data.name}</h2>
                  
                  <h4 class="modal-item">Species</h4>
                  <p class="modal-item">${data.species}</p>
                  <h4 class="modal-item">Gender</h4>
                  <p class="modal-item">${data.gender}</p>
                  <h4 class="modal-item">Origin</h4>
                  <p class="modal-item">${data.origin.name}</p>
                  <h4 class="modal-item">Location</h4>
                  <p class="modal-item">${data.location.name}</p>
                  <h4 class="modal-item">Status</h4>
                  <p class="modal-item">${data.status}</p>
              </div>
          </div>
          `
      );
    });
  });

  // Fechar modal

  window.addEventListener("click", function (event) {
    if (!event.target.classList.contains("modal-item")) {
      modal.style.display = "none";
      modal.removeChild(document.querySelector(".modal"));
    }
  });
}

getCharacters();

// Ver mais (Paginação)

function viewMore() {
  page++;
  getCharacters();
}

// Scroll infinito

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 200) {
    viewMore();
  }
});
