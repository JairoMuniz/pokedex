import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import logo from '/public/13.svg' // Certifique-se de que o caminho está correto

function App() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [pokemonDetails, setPokemonDetails] = useState({})

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        setPokemons(response.data.results)
        response.data.results.forEach(pokemon => {
          axios.get(pokemon.url)
            .then(res => {
              setPokemonDetails(prevDetails => ({
                ...prevDetails,
                [pokemon.name]: res.data
              }))
            })
        })
      })
      .catch(error => console.error('Erro ao buscar dados:', error))
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  const getPokemonType = (pokemon) => {
    return pokemonDetails[pokemon.name]?.types.map(typeInfo => typeInfo.type.name).join(', ') || ''
  }

  const getPokemonColor = (pokemon) => {
    const type = pokemonDetails[pokemon.name]?.types[0]?.type.name
    switch (type) {
      case 'grass': return '#78C850'
      case 'fire': return '#F08030'
      case 'water': return '#6890F0'
      case 'bug': return '#A8B820'
      case 'normal': return '#A8A878'
      case 'poison': return '#A040A0'
      case 'electric': return '#F8D030'
      case 'ground': return '#E0C068'
      case 'fairy': return '#EE99AC'
      case 'fighting': return '#C03028'
      case 'psychic': return '#F85888'
      case 'rock': return '#B8A038'
      case 'ghost': return '#705898'
      case 'ice': return '#98D8D8'
      case 'dragon': return '#7038F8'
      case 'dark': return '#705848'
      case 'steel': return '#B8B8D0'
      case 'flying': return '#A890F0'
      default: return '#A8A878'
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Pokedex</h1>
      </header>
      <input
        type="text"
        placeholder="Pesquisar Pokémon"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="pokedex">
        {filteredPokemons.map((pokemon, index) => {
          const pokemonId = pokemon.url.split('/')[6]; // Extrai o ID do Pokémon da URL
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
          const pokemonType = getPokemonType(pokemon)
          const borderColor = getPokemonColor(pokemon)

          return (
            <div key={index} className="pokemon" style={{ borderColor, backgroundColor: borderColor }} title={pokemonType}>
              <img src={imageUrl} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App