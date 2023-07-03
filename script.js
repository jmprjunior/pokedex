const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector("form");
const input = document.querySelector("input");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 1;

async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        data.id > 649 ? pokemonImage.src = "https://i0.wp.com/imagensemoldes.com.br/wp-content/uploads/2020/04/Logo-Pokebola-Pok%C3%A9mon-PNG.png?fit=512%2C512&ssl=1" : pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        input.value = "";
        pokemonAtual = data.id;
    }
    else {
        pokemonImage.style.display = "none";
        pokemonName.innerText = "Não encontrado :("
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let pokemon = input.value;
    renderPokemon(pokemon);
})

btnPrev.addEventListener("click", () => {
    if(pokemonAtual == 1) {
        alert("Erro!")
        return;
    }
    pokemonAtual--;
    renderPokemon(pokemonAtual);
});

btnNext.addEventListener("click", () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
});


renderPokemon(pokemonAtual);