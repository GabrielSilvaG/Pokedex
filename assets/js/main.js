const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;




function loadePokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detalhes ${pokemon.type}">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
    
                        <div class="pokemon-image-container">
                          <img src="${pokemon.photo}" alt="${pokemon.name}">
                          <div class="abilities-tooltip">
                          <p>HABILIDADES</p>
                            ${pokemon.abilities.map((ability) => `<span>${ability}</span>`).join('<br>')}
                        </div>

                    </div>
        </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    });
}

loadePokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadePokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadePokemonItens(offset, limit)
    }
})

