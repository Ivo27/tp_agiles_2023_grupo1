const PALABRA_A_ADIVINAR = 'javascript'
let palabraUsuario = []
const  MAX_INTENTOS = 6
let intentos = MAX_INTENTOS
const verificarLetra = (letra, palabraAdivinar) => {
    // validar longitud 
    // let esta = false
    if (letra.length !== 1) {
       return false
    }
    palabraAdivinar = palabraAdivinar.toLowerCase()
    letra = letra.toLowerCase()   
    return palabraAdivinar.includes(letra)
    // return esta 
    // if(!esta) intentos++

    // console.log(palabraUsuario)

}


const actualizarIntentos = ( int ) => {  return int === 0 ? 0 : --int}

const completarPalabra = (palabraAdivinar,letra,palabraUsuario) => {
    palabraAdivinar.split('').map((l,index) => {
        if(l == letra) 
        {
            console.log('la letra ' ,letra ,'se encuentra el la pos ',index)
            palabraUsuario[index] = letra
        }
        // console.log(letra)
    })
    // console.log(palabraUsuario)
    return palabraUsuario
}

const verificarFinJuego = (palabraUsuario, palabraAdivinar,int) => {
    if (palabraUsuario === palabraAdivinar) {
        return 'Ganaste'
    }else{
        if(int === 0) {
            return 'Perdiste'
        }else{
            return 'Segui participando te falta ' + int+ ' intentos'
        }
    }
}

// verificarLetra('a', PALABRA_A_ADIVINAR)
// console.log(verificarFinJuego())
// verificarLetra('t', PALABRA_A_ADIVINAR)
// console.log(verificarFinJuego())
// verificarLetra('x', PALABRA_A_ADIVINAR)
// console.log(verificarFinJuego())
// verificarLetra('t', PALABRA_A_ADIVINAR)
// console.log(verificarFinJuego())
// verificarLetra('k', PALABRA_A_ADIVINAR)
// console.log(verificarFinJuego())

// const juego = (letra) => {
//     let existe = verificarLetra(letra, PALABRA_A_ADIVINAR)
//     if(!existe)  actualizarIntentos()
//     else completarPalabra(letra)
//     console.log(verificarFinJuego())
// }


module.exports = {  verificarLetra, PALABRA_A_ADIVINAR,actualizarIntentos,verificarFinJuego,completarPalabra }