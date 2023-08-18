<template>
    <h2>{{ pasarMayuscula }}</h2> 
    <h1>Pokémon Tipo Volador</h1>
    <div class="card-container">
    <div class="card" v-for="pokemon in fuego" :key="pokemon.name" id="tarjeta">    
        <img :src="pokemon.image" :alt="pokemon.name" id="imagen"/>
        <div id="nombrepoke" class="text">{{ pokemon.name }}</div>
        <button  class="btn"  @click="redirectToDetails(pokemon.name)"  id="boton">Detalles</button>
    </div>
  </div>

    
</template>

<script setup> 
import { ref, onMounted } from 'vue';
import { computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());

const redirectToDetails = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const pokemonData = await response.json();
  const imageUrl = pokemonData.sprites.front_default;
  
  // Redirigir a la página de detalles del Pokémon y pasar la imagen como parámetro
  router.push({ name: "pokemon-details", params: { name: pokemonName, image: imageUrl } });
};




const fuego = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type/flying');
    const data = await response.json();
    const pokemonsWithImages = await Promise.all(
      data.pokemon.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.pokemon.url);
        const pokemonData = await pokemonResponse.json();
        const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
        return {
          name: pokemon.pokemon.name,
          image: imageUrl,
        };
      })
    );
    fuego.value = pokemonsWithImages;
  } catch (error) {
    console.error('Error al obtener los Pokémon de fuego:', error);
  }
});
</script>
<style scoped>

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
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.card-text {
  margin-top: 10px;
}
.btn{
  background-color: rgb(176, 175, 175);
  width: 90px;
  height: 30px;
  color: white;
  font-size: 15px;
  margin-left: 40px;

  
}
#boton:hover{
  transform: scale(1.1);
  background-color: rgba(40, 40, 40, 0.779);
}
</style>