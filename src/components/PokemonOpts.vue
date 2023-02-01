<template>
  <div class="options-conatiner">
    <button
      class="options"
      v-for="poke in pokemons"
      :key="poke.id"
      :id="poke.id"
      @click="opcionSeleccionada(poke.id)"
    >
      {{ poke.nombre }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    idPokemonCorrecto: {
      type: Number,
      required: true,
    },
    mostrarCorrecto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      xxx: this.idPokemonCorrecto,
    };
  },
  methods: {
    opcionSeleccionada(id) {
      this.$emit("selecionado", id);
      const btn = document.getElementById(id);
      if (id == this.idPokemonCorrecto) {
        btn.style = "background-color: #1dd1a1";
      } else {
        btn.style = document.getElementById(id).style =
          "background-color: #ff6b6b";
        btn.disabled = true;
      }
      this.mostrar;
    },
  },
  updated() {
    if (this.mostrarCorrecto) {
      const btns = document.getElementsByClassName("options");
      const idPokemon = this.idPokemonCorrecto;
      Array.prototype.forEach.call(btns, function (btn) {
        if (btn.id == idPokemon) {
          btn.style = "background-color: #1dd1a1";
        }
        btn.disabled = true;
      });
    } else {
      const btns = document.getElementsByClassName("options");
      Array.prototype.forEach.call(btns, function (btn) {
        btn.disabled = false;
      });
    }
  },
};
</script>

<style>
.options-conatiner {
  display: flex;
  flex-direction: column;
}

.options {
  background-color: #48dbfb;
  color: #fff;
  font-size: large;
  margin-top: 15px;
  padding: 10px;
  border: none;
  border-radius: 15px;
}

.options:hover {
  cursor: pointer;
}
</style>