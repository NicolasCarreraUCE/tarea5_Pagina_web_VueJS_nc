<template>
  <!--<img v-if="!showPokemon" v-bind:src="urlImagen" alt="No se puede renderisar" class="ocultar-pkemon">-->
  <div class="pantalla">
    <img id="pokemon" v-bind:src="urlImagen" alt="No se puede renderisar" />
  </div>
</template>

<script>
export default {
  props: {
    idPokemon: {
      type: Number,
      required: true,
      default: 1,
      validator(value) {
        return value > 0 && value <= 600;
      },
    },
    showPokemon: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    urlImagen() {
      const url =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
        this.idPokemon +
        ".svg";
      return url;
    },
  },
  /*data(){
    return{
      idPokemon: 1,
      mostrarPokemon: true
    }
  },*/
};
</script>

<style>
.ocultar-pkemon {
  filter: brightness(0);
  position: absolute;
}
img {
  width: 100%;
  /*right: 32%;*/
  -webkit-user-drag: none;
  filter: brightness(0);
}
.pantalla {
  border: 30px solid #222f3e;
  background-color: #fff;
}
</style>