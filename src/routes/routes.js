import Login from "../components/Login.vue" 
import aire from "../components/aire.vue"
import fuego from "../components/fuego.vue"
import Planta from "../components/Planta.vue"
import electrico from "../components/electrico.vue"
import flying from "../components/flying.vue"
import dark from "../components/dark.vue"
import PokemonDetails from "../components/pokemon.vue"
import {createRouter, createWebHashHistory} from "vue-router"

const routes=[
    {path:"/", component: Login},
    {path: "/aire", component: aire},
    {path: "/hello", component: fuego},
    {path: "/Planta", component: Planta},
    {path: "/electrico", component: electrico},
    {path: "/flying", component:flying},
    {path: "/dark", component:dark},
    {path: "/pokemon/:name", component: PokemonDetails, name: "pokemon-details" }

]

export const router = createRouter({
    history: createWebHashHistory(), 
    routes
})