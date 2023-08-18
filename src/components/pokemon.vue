<template>
  <div class="body">
    <div class="card-container">
      <div class="card" id="imagen">
        <img v-if="pokemon" :src="pokemon.image" :alt="pokemon.name" />
        <h1 id="h1">{{ pokemon && pokemon.name }}</h1>
      </div>

      <div class="card" id="habilities">
        <div v-if="pokemon" id="habilidades">
          <h2>Tipo</h2>
          <ul>
            <h3 v-for="type in pokemon.types" :key="type">{{ type }}</h3>
          </ul>

          <h2>Habilidades✨</h2>
          <ul>
            <h3 v-for="ability in pokemon.abilities" :key="ability">{{ ability }}</h3>
          </ul>

          <h2>Vida ❤️</h2>
          <ul>
            <h2>{{ pokemon.hp }}</h2>
          </ul>
          <h2>Ataque ⚔️</h2>
          <ul>
           <h2>{{ pokemon.attack }}</h2>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
 <div class="btn-container">
    <router-link to="/" class="btn" id="volver">Volver</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pokemonName = ref(route.params.name);
const pokemon = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value}`);
    const data = await response.json();
    const imageUrl = data.sprites.other['official-artwork'].front_default;
    pokemon.value = {
      name: data.name,
      image: imageUrl,
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
      attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
    };
  } catch (error) {
    console.error('Error al obtener los detalles del Pokémon:', error);
  }
});
</script>
<style scoped>
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
#volver{
  background-color: rgb(176, 175, 175);
  width: 100px;
  height: 35px;
  color: white;
  font-size: 15px;
  justify-content: center; 
  display: flex;
  
}
#imagen{
  width: 500px;
}
.body{
  justify-content: center;
}
#volver:hover{
  transform: scale(1.1);
  background-color: rgba(40, 40, 40, 0.779);
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center; 
}
#h1{
  font-size: 80px;
  font-family: cursive;
}
.card {
  width: 500px;
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
#habilidades{
  font-family: cursive;
  font-size: 40px;
}
#habilities{
  width: 1000px;
}
</style>