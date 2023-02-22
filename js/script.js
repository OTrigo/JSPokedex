const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokeImage = document.querySelector('.pokeImage')

const form = document.querySelector('form')
const input = document.querySelector('.input__search')

const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let indexPokemon = 1

const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;   
    }
}

const renderPokemon = async (pokemon)=>{
    pokemonName.innerHTML = 'Carregando...';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        input.value = ''
    }
    else{
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '0'
        pokeImage.src = '#'
    }
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

next.addEventListener("click", ()=>{
    indexPokemon++
    renderPokemon(indexPokemon)
})

prev.addEventListener("click", ()=>{
    if(indexPokemon>1){
        indexPokemon--
        renderPokemon(indexPokemon)
    }
})

renderPokemon(indexPokemon)

