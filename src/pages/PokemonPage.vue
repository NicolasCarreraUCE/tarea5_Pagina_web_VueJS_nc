<template>
  <h1 v-if="!pokemonCorrecto">Espere por favor...</h1>
  <div v-if="pokemonCorrecto && !finDelJuego" class="contenedor">
    <h1>¿Quién es este Pokemon?</h1>
    <div class="contenedor-puntos">
      <p class="puntos">Puntuación: {{ this.puntuacion }}</p>
      <p class="puntos">{{ this.repeticiones }}</p>
    </div>
    <PokemonImg :idPokemon="pokemonCorrecto.id" :showPokemon="mostarPokemon" />
    <button
      class="btn-siguiente"
      v-if="mostarPokemon && !finDelJuego"
      @click="siguienteJuego"
    >
      Siguiente
    </button>
    <PokemonOpts
      :pokemons="pokemonArr"
      :idPokemonCorrecto="pokemonCorrecto.id"
      :mostrarCorrecto="mostarPokemon"
      @selecionado="validarRespuesta($event)"
    />
  </div>
  <div class="mensaje" v-if="finDelJuego">
    <h1>{{ mensaje }}</h1>
    <button class="btn-siguiente" @click="reiniciar">Juego Nuevo</button>
  </div>
</template>

<script>
import PokemonImg from "@/components/PokemonImg.vue";
import PokemonOpts from "@/components/PokemonOpts.vue";
import obtenerPokemonsFachada from "../js/FuncionalidadOptsPokemon.js";
export default {
  components: {
    PokemonImg,
    PokemonOpts,
  },
  data() {
    return {
      pokemonArr: [],
      pokemonCorrecto: null,
      mostarPokemon: false,
      mensaje: "",
      puntuacion: 0,
      intentos: 2,
      repeticiones: 3,
      finDelJuego: false,
    };
  },
  mounted() {
    this.cargaPokemonInicial();
  },
  updated() {
    if (this.repeticiones <= 0) {
      this.finDelJuego = true;
      if (this.puntuacion >= 10) {
        this.mensaje = `¡FELICIDADES, HAS GANADO EL JUEGO CON UNA PUNTUACIÓN DE ${this.puntuacion}!`;
      } else {
        this.mensaje = "PERDISTE, FIN DEL JUEGO";
      }
    }
  },
  methods: {
    async cargaPokemonInicial() {
      const vec = await obtenerPokemonsFachada();
      this.pokemonArr = vec;

      const numero = Math.floor(Math.random() * 4);
      this.pokemonCorrecto = this.pokemonArr[numero];
    },
    validarRespuesta(pokemonSeleccionadoHijo) {
      const idSelecionado = pokemonSeleccionadoHijo;
      if (idSelecionado == this.pokemonCorrecto.id) {
        this.puntuacion += 3 * this.intentos - 1;
        this.mostarPokemon = true;
        document.getElementById("pokemon").style = "filter: none";
      } else {
        this.intentos--;
        if (this.intentos <= 0) {
          this.mostarPokemon = true;
          document.getElementById("pokemon").style = "filter: none";
        }
      }
    },
    async siguienteJuego() {
      if (this.repeticiones > 0) {
        document.getElementById("pokemon").style = "filter: brightness(0);";
        this.mostarPokemon = false;
        this.intentos = 2;
        await this.cargaPokemonInicial();
        this.repeticiones--;
      }
    },
    async reiniciar() {
      this.pokemonArr = [];
      this.pokemonCorrecto = null;
      this.mostarPokemon = false;
      this.mensaje = "";
      this.puntuacion = 0;
      this.intentos = 2;
      this.repeticiones = 3;
      this.finDelJuego = false;
      await this.cargaPokemonInicial();
    },
  },
};
</script>

<style>
h1 {
  color: #fff;
}
.contenedor {
  display: flex;
  flex-direction: column;
  background-color: #d63031;
  border-radius: 15px;
  padding: 30px;
  width: 30vw;
  margin: auto;
}
.contenedor-puntos {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 50px;
}

.puntos {
  background-color: #222f3e;
  color: #fff;
  border-radius: 30px;
  font-size: large;
  padding: 5px;
}
.btn-siguiente {
  display: block;
  width: max-content;
  background-color: #feca57;
  color: #ff9f43;
  font-size: large;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border: none;
  border-radius: 15px;
}
.btn-siguiente:hover {
  cursor: pointer;
}
.mensaje {
  background-color: #c8d6e5;
  width: 75vw;
  margin: auto;
  border-radius: 15px;
  padding: 50px;
}
</style>