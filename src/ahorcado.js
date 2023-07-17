


// create a list of easy work between 5 and 10 letters 
export const palabrasFaciles = ['cara', 'leo', 'mama', 'papa', 'casa', 'perro', 'gato', 'pato', 'facil', 'ivo']
// create a list of medium work between 10 and 15 letters
export const palabrasMedios = ["fantasma", "sandía", "escuela", "montaña", "guitarra", "dormir", "perfume", "ballena", "teléfono", "velocidad"];
// create a list of hard work between 15 and 20 letters
export const palabrasDificiles = ['Extravagante', 'Inconformes', 'Desconcertado', 'Contradicción', 'Perseverante', 'Establecimiento', 'Espléndidamente', 'Anticonstitucional', 'Desesperadamente', 'Incomunicación'];







export class Ahorcado {
    // PALABRA_A_ADIVINAR = 'javascript'
    // palabraUsuario = []
    MAX_INTENTOS = 6
    // intentos = MAX_INTENTOS
    // TODO :: implemenmtar timer para que se termine el juego
    TIMER = 60

    // create a constructor with the parameters
    constructor(difucultad, val = 1) {
        // this.palabraAdivinar = palabraAdivinar
        // this.palabraUsuario = palabraUsuario
        this.difucultad = difucultad
        this.intentos = this.MAX_INTENTOS
        this.palabraUsuario = []
        this.letrasErradas = []
        if (val === 2) {
            if (difucultad === 'facil') this.palabraAdivinar = palabrasFaciles[Math.floor(Math.random() * palabrasFaciles.length)]
            else if (difucultad === 'medio') this.palabraAdivinar = palabrasMedios[Math.floor(Math.random() * palabrasMedios.length)]
            else if (difucultad === 'dificil') this.palabraAdivinar = palabrasDificiles[Math.floor(Math.random() * palabrasDificiles.length)]
        } else {

            if (difucultad === 'facil') this.palabraAdivinar = 'java'
            else if (difucultad === 'medio') this.palabraAdivinar = 'python'
            else if (difucultad === 'dificil') this.palabraAdivinar = 'javascript'
        }

    }

    verificarLetra = (letra) => {
        if (letra.length !== 1) return false
        this.palabraAdivinar = this.palabraAdivinar.toLowerCase()
        return this.palabraAdivinar.includes(letra.toLowerCase())
    }

    actualizarIntentos = () => this.intentos === 0 ? 0 : --this.intentos

    completarPalabra = (letra) => {
        this.palabraAdivinar.split('').map((l, index) => {
            if (l == letra) this.palabraUsuario[index] = letra
        })
        return this.palabraUsuario
    }

    verificarFinJuego = () => {
        if (this.palabraUsuario.join('') === this.palabraAdivinar) return 'Ganaste'
        else {
            if (this.intentos === 0) return 'Perdiste'
            else return 'Segui participando te falta ' + this.intentos + ' intentos'
        }
    }

    agregarLetrasErradas = (letra) => {
        if (this.verificarLetra(letra)) {
            return false
        } else {
            this.letrasErradas.push(letra)
            return this.letrasErradas
        }
    }
    reiniciarJuego = () => {
        this.palabraUsuario = []
        this.letrasErradas = []
        this.intentos = this.MAX_INTENTOS
    }

}
