let currentPokemonIndex = 0;

function searchPokemon() {
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  const pokemonTitle = document.getElementById('pokemonTitle');
  const pokemonImage = document.getElementById('pokemonImage');
  const pokemonHeight = document.getElementById('pokemonHeight');
  const pokemonWeight = document.getElementById('pokemonWeight');
  const pokemonTypes = document.getElementById('pokemonTypes');
  const relatedPokemon = document.getElementById('relatedPokemon');
  const relatedPokemonList = document.getElementById('relatedPokemonList');

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(data => {
      pokemonTitle.textContent = data.name;
      pokemonImage.src = data.sprites.front_default;
      pokemonHeight.textContent = `Height: ${data.height}`;
      pokemonWeight.textContent = `Weight: ${data.weight}`;
      pokemonTypes.textContent = `Type(s): ${data.types.map(type => type.type.name).join(', ')}`;
      showRelatedPokemonList(data.types[0].type.name);
      document.getElementById('pokemonInfo').classList.remove('hidden');
      document.getElementById('relatedPokemon').classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error fetching Pokémon data:', error);
      document.getElementById('pokemonInfo').classList.add('hidden');
      document.getElementById('relatedPokemon').classList.add('hidden');
      alert('Pokémon not found');
    });
}

function showPrevPokemon() {
    if (currentPokemonIndex > 0) {
      currentPokemonIndex--;
      searchPokemon();
    }
  }
  
  function showNextPokemon() {
    currentPokemonIndex++;
    searchPokemon();
  }

function showRelatedPokemonList(type) {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(response => response.json())
      .then(data => {
        const relatedPokemonListElement = document.getElementById('relatedPokemonList');
        relatedPokemonListElement.innerHTML = '';
  
        data.pokemon.slice(0, 5).forEach(pokemon => {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
            .then(response => response.json())
            .then(pokemonData => {
              const relatedPokemonCard = document.createElement('div');
              relatedPokemonCard.className = 'related-pokemon-card';
              relatedPokemonCard.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>${pokemonData.name}</p>
              `;
              relatedPokemonCard.addEventListener('click', () => showRelatedPokemon(pokemonData.name));
              relatedPokemonListElement.appendChild(relatedPokemonCard);
            })
            .catch(error => {
              console.error('Error fetching related Pokémon data:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching related Pokémon data:', error);
      });
  }
  
  

function showRelatedPokemon(relatedPokemonName) {
  const pokemonNameInput = document.getElementById('pokemonName');
  pokemonNameInput.value = relatedPokemonName;
  const pokemonImage = document.getElementById('pokemonImage');
  pokemonImage.src = data.sprites.front_default;
  searchPokemon();
}
