const pokemonCard = document.getElementById("pokemonCard");

const pokemonInput = document.getElementById("pokemonInput");

let pokemonAtual = 1;

const cores = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0"
};

async function buscarPokemon(nomeOuNumero){

    const valor =
        nomeOuNumero || pokemonInput.value.toLowerCase();

    if(!valor){
        return;
    }

    pokemonCard.innerHTML = "<p>Carregando...</p>";

    try{

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${valor}`
        );

        if(!resposta.ok){
            throw new Error("Pokémon não encontrado");
        }

        const pokemon = await resposta.json();

        pokemonAtual = pokemon.id;

        mostrarPokemon(pokemon);

    } catch(erro){

        pokemonCard.innerHTML = `
            <p>Pokémon não encontrado!</p>
        `;
    }
}

function mostrarPokemon(pokemon){

    const tipoPrincipal =
        pokemon.types[0].type.name;

    const cor =
        cores[tipoPrincipal] || "#777";

    const tipos =
        pokemon.types.map(tipo => `
            <span class="tipo">
                ${tipo.type.name}
            </span>
        `).join("");

    const stats =
        pokemon.stats.map(stat => `
            <p>
                ${stat.stat.name}: ${stat.base_stat}
            </p>
        `).join("");

    pokemonCard.innerHTML = `
        <div class="card"
             style="background-color:${cor}">

            <h2>
                ${pokemon.name.toUpperCase()}
            </h2>

            <img
                src="${pokemon.sprites.front_default}"
            >

            <div>
                ${tipos}
            </div>

            <div>
                ${stats}
            </div>

        </div>
    `;
}

function pokemonAnterior(){

    if(pokemonAtual > 1){

        pokemonAtual--;

        buscarPokemon(pokemonAtual);
    }
}

function pokemonProximo(){

    pokemonAtual++;

    buscarPokemon(pokemonAtual);
}