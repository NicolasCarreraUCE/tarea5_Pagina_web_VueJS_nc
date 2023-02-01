const obtenerPokemons = async () => {
    const vid = obtenerVectorNumerico()
    const vnom = await obtenerVectorNombres(vid)
    console.table(vnom)
    return vnom
}
const obtenerVectorNumerico = () => {
    const arreglo = [obtenerAleatorio(1,600), obtenerAleatorio(1,600), obtenerAleatorio(1,600), obtenerAleatorio(1,600)]    
    return arreglo
}
const obtenerVectorNombres = async ([p1, p2, p3, p4] = []) => {
    const nomp1 = await obtenerNombreAPI(p1)
    const nomp2 = await obtenerNombreAPI(p2)
    const nomp3 = await obtenerNombreAPI(p3)
    const nomp4 = await obtenerNombreAPI(p4)
    const pokemon1 = {
        nombre: nomp1,
        id: p1
    }
    const pokemon2 = {
        nombre: nomp2,
        id: p2
    }
    const pokemon3 = {
        nombre: nomp3,
        id: p3
    }
    const pokemon4 = {
        nombre: nomp4,
        id: p4
    }
    const vecNombres = [pokemon1, pokemon2, pokemon3, pokemon4]
    return vecNombres
}
const obtenerNombreAPI = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
    const {name} = data
    return name
} 
const obtenerAleatorio = (min, max) => {
    max++
    return Math.floor(Math.random() * (max - min) + min)
}
const obtenerPokemonsFachada = async () => {
    return await obtenerPokemons()
}
export default obtenerPokemonsFachada