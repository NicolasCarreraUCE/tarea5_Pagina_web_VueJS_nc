<template>
  <div class="busqueda" v-if="!pokemon.img">
    <h1>Pokemon</h1>
    <label for="">Nombre del pokemon:</label>
    <input type="text" v-model="nombre" />
    <button @click="buscar">Buscar</button>
  </div>
  <div class="alerta" v-show="alerta != ''">{{ alerta }}</div>
  <img v-if="pokemon.img" :src="pokemon.img" alt="NaN" />
  <div class="resultado" v-if="pokemon.img">
    <p><b>Nombre:</b> {{ pokemon.nombre }}</p>
    <p><b>ID:</b> {{ pokemon.id }}</p>
    <button @click="reiniciar">Reiniciar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon: {
        id: null,
        img: null,
        nombre: null,
      },
      nombre: "",
      alerta: "",
    };
  },
  methods: {
    async buscar() {
      for (let i = 1; i <= 600; i++) {
        let { name } = await this.APIPokemonId(i);
        console.log(i);
        if (name == this.nombre.toLowerCase()) {
          const pokemon = {
            id: i,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`,
            nombre: name,
          };
          this.alerta = "";
          this.pokemon = pokemon;
          break;
        }
      }
      if (this.pokemon.id == null) {
        this.alerta =
          "ADVERTENCIA: ¡¡El Pokémon \"" +
          this.nombre +
          "\" no se pudo encontrar!!";
      }
    },
    async APIPokemonId(id) {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon/" + id).then(
        (r) => r.json()
      );
      return data;
    },
    async APIPokemonNombre(nombre) {
      const data = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + nombre
      ).then((r) => r.json());
      return data;
    },
    reiniciar() {
      this.pokemon = {
        id: null,
        img: null,
        nombre: null,
      };
      this.nombre = "";
      this.alerta = "";
    },
  },
};
</script>

<style>
img {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;
}
.resultado {
  margin-top: 60vh;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 30px;
  width: 50%;
}
.resultado p {
  color: #fff;
}
p,
label,
input,
button {
  font-size: large;
  margin: 15px auto;
}
button,
input {
  border-radius: 15px;
  padding: 5px 30px;
  text-align: center;
}
.busqueda {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50vw;
  height: 70vh;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #dfe6e9;
}
.busqueda h1 {
  font-size: 75px;
}
.alerta {
  background-color: #f6e58d;
  border: 2px solid #f9ca24;
  border-radius: 15px;
  width: 50vw;
  margin: 30px auto;
  padding: 15px 0px;
}
</style>