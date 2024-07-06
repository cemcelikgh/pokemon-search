const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonSprite = document.getElementById('sprite-container')
const pokemonTypes = document.getElementById('types');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');

const clearPokemonData = () => {
  pokemonName.textContent = '';
  pokemonId.textContent = '';
  pokemonWeight.textContent = '';
  pokemonHeight.textContent = '';
  pokemonSprite.innerHTML = '';
  pokemonTypes.innerHTML = '';
  pokemonHp.textContent =  '';
  pokemonAttack.textContent =  '';
  pokemonDefense.textContent =  '';
  pokemonSpecialAttack.textContent =  '';
  pokemonSpecialDefense.textContent =  '';
  pokemonSpeed.textContent =  '';
};

const searchPokemon = (event) => {
  event.preventDefault();

  if (searchInput.validity.valueMissing) {
    searchInput.setCustomValidity('');
    searchInput.reportValidity();
    return;
  };

  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`)
    .then(response => response.json())
    .then(data =>
      {showPokemon(data)},
      () => {
        clearPokemonData();
        alert('Pokémon not found');
      }
    );
  };

const showTypes = (pokemonData) => {
  let { types } = pokemonData;
  pokemonTypes.innerHTML = '';
  return types.forEach(element => {
    pokemonTypes.innerHTML += `<span class='type ${element.type.name}'>${element.type.name}</span>`;
    });
};

const showPokemon = (pokemonData) => {
  let { name, id, weight, height, sprites, stats } = pokemonData;
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  pokemonSprite.innerHTML = `<img id='sprite'src='${sprites.front_default}' alt='${name}' />`;
  showTypes(pokemonData);
  pokemonHp.textContent = `${stats[0].base_stat}`;
  pokemonAttack.textContent = `${stats[1].base_stat}`;
  pokemonDefense.textContent = `${stats[2].base_stat}`;
  pokemonSpecialAttack.textContent = `${stats[3].base_stat}`;
  pokemonSpecialDefense.textContent = `${stats[4].base_stat}`;
  pokemonSpeed.textContent = `${stats[5].base_stat}`;
};

searchForm.addEventListener('submit', searchPokemon);
