const app = Vue.createApp({
    data() {
        return {
            listaEstudaintes: [],
            nombre: '',
            apellido: '',
            direccion: ''
        }
    },
    methods: {
        agregarEstudiante(event) {
            const estudainte = {
                nombre: this.nombre,
                apellido: this.apellido,
                direccion: this.direccion
            }
            this.listaEstudaintes.unshift(estudainte)
            document.getElementById('nombre').value = ''
            document.getElementById('apellido').value = ''
            document.getElementById('direccion').value = ''
        }
    }
})

app.mount('#myApp')