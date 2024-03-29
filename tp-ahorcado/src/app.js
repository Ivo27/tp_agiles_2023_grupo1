const PALABRA_A_ADIVINAR = 'javascript'
let palabraUsuario = []
const MAX_INTENTOS = 6
let intentos = MAX_INTENTOS


const verificarLetra = (letra, palabraAdivinar) => {

    if (letra.length !== 1) return false
    palabraAdivinar = palabraAdivinar.toLowerCase()
    return palabraAdivinar.includes(letra.toLowerCase())
}

const actualizarIntentos = int => int === 0 ? 0 : --int

// function actualizarIntentos(int){
//     if()

//     return 

// }

const completarPalabra = (palabraAdivinar, letra, palabraUsuario) => {
    palabraAdivinar.split('').map((l, index) => {
        if (l == letra) palabraUsuario[index] = letra
    })
    return palabraUsuario
}

const verificarFinJuego = (palabraUsuario, palabraAdivinar, int) => {
    if (palabraUsuario === palabraAdivinar) return 'Ganaste'
    else {
        if (int === 0) return 'Perdiste'
        else return 'Segui participando te falta ' + int + ' intentos'
    }
}

/*
    devuelve false si la letra esta en la palabra a adivinar
    y la lista de las letras erradas actualizada si no esta en la palabra a adivinar
*/
const palabraErradas = (palabraAdivinar, letra, letrasErradas) => {
    if (verificarLetra(letra, palabraAdivinar)) {
        return false
    } else {
        letrasErradas.push(letra)
        return letrasErradas
    }
}

const jugar = (palabraAdivinar) => {

    let letrasErradas = []
    let int = 20
    let palabraUsuario = []
    // a variable to store all the letter of the alphabet
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 30; i++) {
        //  get alet letter random letter from the alphabet
        let letter = ''
        do {
            letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        } while (letrasErradas.includes(letter))

        let existe = verificarLetra(letter, palabraAdivinar)
        if (!existe) {
            int = actualizarIntentos(int)
            letrasErradas = palabraErradas(palabraAdivinar, letter, letrasErradas)
        }
        else completarPalabra(palabraAdivinar, letter, palabraUsuario)
        let res = verificarFinJuego(palabraUsuario.join(''), palabraAdivinar, int)
        // console.log('Palabra a adivinar: ' + palabraUsuario.join(''), 'Letras erradas: ' + letrasErradas.join(''), 'Intentos: ' + int)
        if (res === 'Ganaste') return 'Ganaste'
        else if (res === 'Perdiste') return 'Perdiste'
    }
}

module.exports = { verificarLetra, actualizarIntentos, verificarFinJuego, completarPalabra, palabraErradas, jugar }