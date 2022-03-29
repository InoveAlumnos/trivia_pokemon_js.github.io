"use strict";

const pokeCard = document.querySelector('#data-poke-card');
const pokeName = document.querySelector('#data-poke-name');
const pokeId = document.querySelector('#data-poke-id');
const pokeTypes = document.querySelector('#data-poke-types');
const pokeStats = document.querySelector('#data-poke-stats');
const send = document.getElementById('send')
const reload = document.getElementById('reload')
const img = document.querySelector('#imgpokemon')

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const pokemons = [
  { nome: "Bulbasaur",
   img: "https://i.imgur.com/i8XNPzH.png"},
  { nome: "Charmander",
   img: "https://i.imgur.com/hw6r9jp.png"},
  { nome: "Squirtle",
   img: "https://i.imgur.com/luFwOtt.png"},
  { nome: "Caterpie",
   img: "https://i.imgur.com/fYd0zhk.png"},
  { nome: "Butterfree",
   img: "https://i.imgur.com/N7hW4ia.png"},
  { nome: "Pidgey",
   img: "https://i.imgur.com/sTwW96f.png"},
  { nome: "Pikachu",
   img: "https://i.imgur.com/DA8VZcl.png"},
  { nome: "Jigglypuff",
   img: "https://i.imgur.com/83gAWBc.png"},
  { nome: "Eevee",
   img: "https://i.imgur.com/J2llTmP.png"},
  { nome: "Psyduck",
   img: "https://i.imgur.com/DepWIsP.png"},
  { nome: "Magikarp",
   img: "https://i.imgur.com/aeVVZwg.png"},
  { nome: "Rattata",
   img: "https://i.imgur.com/ymDTIPD.png"},
  { nome: "Mewtwo",
   img: "https://i.imgur.com/gx3Lq7l.png"}]


let numero = 0;

function aleatorio(){
  numero = Math.floor(Math.random() * pokemons.length)

  img.setAttribute('src', pokemons[numero].img)
}

restart()

function restart(){
  document.querySelector('span').innerHTML = " ";
  document.getElementById('imgpokemon').className = null
  document.getElementById('skills-description').style.display = "none"
  aleatorio()
}

send.onclick = () => {
  let answer = document.querySelector('input').value.trim();

  if(answer.length) {
    if(answer.toLowerCase() == pokemons[numero].nome.toLowerCase()) {
      document.querySelector('span').innerHTML = "¡Felicidades! Es " + pokemons[numero].nome
      document.getElementById('imgpokemon').className = "done"
      document.querySelector('input').value = ""
      console.log(answer.toLowerCase())
      searchPokemon(answer.toLowerCase())
    }
    else {
      document.querySelector('span').innerHTML = "¡No! Es " + pokemons[numero].nome
      document.getElementById('imgpokemon').className = "success"
      document.querySelector('input').value = ""
      setTimeout(() => { restart(); }, 2000)
    }
  }
  else {
    document.querySelector('span').innerHTML = "Coloque el nombre "
  }
}

reload.onclick = restart

// Skills section -----------------------------------------------------------------

const searchPokemon = event => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${event}`)
      .then(data => data.json())
      .then(response => renderPokemonData(response))
      .catch(err => renderNotFoundrenderNotFound())
}

const renderPokemonData = data => {
    // const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    document.getElementById('skills-description').style.display = "block"

    pokeName.textContent = data.name;
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementAmount.textContent = stat.base_stat;       
        statElementName.textContent = stat.stat.name;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
