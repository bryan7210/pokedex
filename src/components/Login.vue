<template>
  <h1>
    <img id="img" src="https://th.bing.com/th/id/R.c31fa44fd920efa7809db7ac1b0be4a2?rik=Majglz5I9Ikx8g&pid=ImgRaw&r=0" alt="">
    <div class="search-container">
      <input type="text" v-model="searchTerm" id="buscar" placeholder="Buscar..." />
      <button class="btn" @click="searchPokemons">Buscar</button>
    </div>
  </h1>
  <h2>{{ pasarMayuscula }}</h2>

  <div>

    <div class="card-container">
      <div class="card" v-for="pokemon in visiblePokemons" :key="pokemon.name">
        <img :src="pokemon.image" :alt="pokemon.name" class="card-image" />
        <div class="card-text" id="nombre_po">
          {{ pokemon.name }} 
        </div>
        <button class="btn" @click="redirectToDetails(pokemon.name)">Detalles</button>
      </div>
    </div>

    <div class="button-container">
      <button class="btn" id="mas" v-if="loadMore" @click="loadMorePokemons">Más</button>
      <button class="btn" id="menos" v-else @click="resetPokemons">Menos</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
const router = useRouter();

const redirectToDetails = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const pokemonData = await response.json();
  const imageUrl = pokemonData.sprites.front_default;

  // Redirigir a la página de detalles del Pokémon y pasar la imagen como parámetro
  router.push({ name: "pokemon-details", params: { name: pokemonName, image: imageUrl } });
};

const pokemons = ref([]);
const visiblePokemons = ref([]);
const loadMore = ref(true);
const searchTerm = ref('');

onMounted(async () => {
  await loadPokemons();
});

const loadPokemons = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50');
    const data = await response.json();
    const pokemonsWithImages = await Promise.all(
      data.results.map(async (result) => {
        const pokemonResponse = await fetch(result.url);
        const pokemonData = await pokemonResponse.json();
        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
        return {
          name: result.name,
          id: pokemonData.id,
          image: imageUrl,
        };
      })
    );
    pokemons.value = pokemonsWithImages;
    visiblePokemons.value = pokemonsWithImages;
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
  }
};

const loadMorePokemons = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50');
    const data = await response.json();
    const pokemonsWithImages = await Promise.all(
      data.results.map(async (result) => {
        const pokemonResponse = await fetch(result.url);
        const pokemonData = await pokemonResponse.json();
        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
        return {
          name: result.name,
          id: pokemonData.id,
          image: imageUrl,
        };
      })
    );
    pokemons.value = [...pokemons.value, ...pokemonsWithImages];
    visiblePokemons.value = pokemons.value;
    if (pokemons.value.length >= 100) {
      loadMore.value = false;
    }
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
  }
};

const resetPokemons = () => {
  visiblePokemons.value = pokemons.value.slice(0, 50);
  loadMore.value = true;
};

const searchPokemons = () => {
  if (searchTerm.value.trim() === '') {
    visiblePokemons.value = pokemons.value;
  } else {
    const filteredPokemons = pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
    visiblePokemons.value = filteredPokemons;
  }
};
</script>

<style scoped>
#img{
  height: 100px;
  width: 500px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 200px;
  margin: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  text-align: center;
}

.card-image {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.card-text {
  margin-top: 10px;
}

.search-container {
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
  margin-top: -80px;
  height: 40px;
  
}

input[type="text"] {
  width: 200px;
  padding: 5px;
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  background-color: rgb(176, 175, 175);
  width: 90px;
  height: 30px;
  color: white;
  font-size: 15px;
  margin-left: 40px;
  margin-top: 10px;
}

.btn:hover {
  transform: scale(1.1);
  background-color: rgba(40, 40, 40, 0.779);
}

#mas {
  background-color: rgb(176, 175, 175);
  width: 90px;
  height: 30px;
  color: white;
  font-size: 15px;
  margin-left: 40px;
  margin-top: 10px;
}

#mas:hover {
  transform: scale(1.1);
  background-color: rgba(40, 40, 40, 0.779);
}

#menos {
  background-color: rgb(176, 175, 175);
  width: 90px;
  height: 30px;
  color: white;
  font-size: 15px;
  margin-left: 40px;
  margin-top: 10px;
}

#menos:hover {
  transform: scale(1.1);
  background-color: rgba(40, 40, 40, 0.779);
}

#nombre_po {
  font-size: 20px;
  font-family: cursive;
  margin-top: -10px;
}
#buscar{
  border-radius:10px ;
}
</style>

