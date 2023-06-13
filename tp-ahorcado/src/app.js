const PALABRA_A_ADIVINAR = 'javascript'
let palabraUsuario = []
const  MAX_INTENTOS = 6
let intentos = MAX_INTENTOS


const verificarLetra = (letra, palabraAdivinar) => {
   
    if (letra.length !== 1) return false   
    palabraAdivinar = palabraAdivinar.toLowerCase()
    return palabraAdivinar.includes(letra.toLowerCase()) 
}

const actualizarIntentos = int  => int === 0 ? 0 : --int

const completarPalabra = (palabraAdivinar,letra,palabraUsuario) => {
    palabraAdivinar.split('').map((l,index) => {
        if(l == letra) palabraUsuario[index] = letra        
    })
    return palabraUsuario
}

const verificarFinJuego = (palabraUsuario, palabraAdivinar,int) => {
    if (palabraUsuario === palabraAdivinar)        return 'Ganaste' 
    else{
        if(int === 0) return 'Perdiste'        
        else return 'Segui participando te falta ' + int + ' intentos'
    }
}

/*
    devuelve false si la letra esta en la palabra a adivinar
    y la lista de las letras erradas actualizada si no esta en la palabra a adivinar
*/
const palabraErradas = (palabraAdivinar,letra,letrasErradas) => {
    if( verificarLetra(letra, palabraAdivinar) ){
        return false
    }else{
        letrasErradas.push(letra)
        return letrasErradas
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


module.exports = {  verificarLetra, actualizarIntentos,verificarFinJuego,completarPalabra,palabraErradas }