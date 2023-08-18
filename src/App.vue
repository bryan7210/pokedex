<template>
  <body class="body">
    
  
   <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar id="header">
        <div>

          <button id="menu" @click="toggleLeftDrawer"><img src="https://cdn-icons-png.flaticon.com/512/4254/4254068.png" alt="" id="imgmenu"></button>
        </div>
       

        <q-toolbar-title>
          <q-avatar id="logo">
            <h1>pokedex</h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png" >
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated class="drawer-container" style="background-color: rgba(128, 128, 128, 0.241); font-family: cursive; " >
      <!-- drawer content -->

      <h2>{{ pasarMayuscula }}</h2>
      <h1>Filtar</h1>
      <div id="boton1">
        <button type="button" class="btn btn-secondary me-2"><router-link to="/" class="text-white" id="boton1">Inicio</router-link></button>
      </div>
      <div id="boton1">
        <button type="button" class="btn btn-warning me-2"><router-link to="/hello" class="text-black" id="boton1">Fuego</router-link></button>
      </div>
      <div id="boton1">
        <button type="button" class="btn btn-primary me-2"><router-link to="/aire" class="text-white" id="boton1">Agua</router-link></button>
      </div>
      <div id="boton1">
        <button type="button" class="btn btn-success me-2"><router-link to="/planta" class="text-white" id="boton1">Planta</router-link></button>
      </div>  
      <div id="boton">
        <button type="button" class="btn"><router-link to="/electrico" class="text-white" id="boton2">Electrico</router-link></button>
      </div>
      <div id="boton3">
        <button type="button" class="btn"><router-link to="/flying" class="text-white" id="boton2">Volador</router-link></button>
      </div>
      <div id="boton4">
        <button type="button" class="btn"><router-link to="/dark" class="text-white" id="boton2">Siniestro</router-link></button>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

   </q-layout>
  </body>
</template>





<script setup>
import { ref } from 'vue'
import { computed } from "vue";
import { useUserStore } from "./stores/user";



const userStore = useUserStore();
const pasarMayuscula = computed(() => userStore.userData.toUpperCase());



const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}



</script>

<style scoped>
.body{
  background-color:rgba(128, 128, 128, 0.241);
  font-family: cursive;
  display: flex;
  align-items: center;
  justify-content: center;
}
#logo{
  height: 40px;
  width: 60px;
  margin-right: 500px;
  background-color: rgb(0, 0, 0);
}
#header{
  background-color: rgb(255, 0, 0);
}
#menu{
  background-color: red;
  border-color: red;
  height: 40px;
  width: 40px;
}
#menu:hover{
  transform: scale(1.1);
}
#imgmenu{
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px; 
}
#boton1{
  margin-top: 10px;
}
#boton{
  background-color: blueviolet;
  width: 150px;
  height: 35px;
  color: rgb(0, 0, 0);
  font-size: 15px; 
  border-radius:5px ;
  margin-top: 10px;
}
#boton:hover{
  transform: scale(1.1);
}
#boton3{
  background-color: rgb(62, 175, 237);
  width: 150px;
  height: 35px;
  color: rgb(0, 0, 0);
  font-size: 15px; 
  border-radius:5px ;
  margin-top: 10px;
}
#boton3:hover{
  transform: scale(1.1);
}
#boton4{
  background-color: rgb(0, 0, 0);
  width: 150px;
  height: 35px;
  color: rgb(0, 0, 0);
  font-size: 15px; 
  border-radius:5px ;
  margin-top: 10px;
}
#boton4:hover{
  transform: scale(1.1);
}
.btn:hover {
 transform: scale(1.1);
}
.btn{
  width: 150px;
  height: 40px;
  font-size: 20px;
}

</style>
