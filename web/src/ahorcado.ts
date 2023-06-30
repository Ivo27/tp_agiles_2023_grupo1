


// create a list of easy work between 5 and 10 letters 
const palabrasFaciles = ['cara', 'leo', 'mama', 'papa', 'casa', 'perro', 'gato', 'pato', 'facil', 'ivo']
// create a list of medium work between 10 and 15 letters
const palabrasMedios = ["fantasma", "sandía", "escuela", "montaña", "guitarra", "dormir", "perfume", "ballena", "teléfono", "velocidad"];
// create a list of hard work between 15 and 20 letters
const palabrasDificiles = ['Extravagante', 'Inconformes', 'Desconcertado', 'Contradicción', 'Perseverante', 'Establecimiento', 'Espléndidamente', 'Anticonstitucional', 'Desesperadamente', 'Incomunicación'];

type NIVEL = 'facil' | 'medio' | 'dificil'

export class Ahorcado {
    MAX_INTENTOS = 9
    // intentos = MAX_INTENTOS
    // TODO :: implemenmtar timer para que se termine el juego
    TIMER = 60
    nivel: string;
    intentos: number;
    palabraUsuario: string[];
    letrasErradas: string[];
    palabraAdivinar: string;

    // create a constructor with the parameters
    constructor(nivel: NIVEL = 'facil') {
        this.palabraAdivinar = ''
        this.nivel = nivel
        // if (nivel === 'facil' || nivel === 'medio') this.MAX_INTENTOS = 
        this.intentos = this.MAX_INTENTOS
        this.palabraUsuario = []
        this.letrasErradas = []
        if (nivel === 'facil') this.palabraAdivinar = palabrasFaciles[Math.floor(Math.random() * palabrasFaciles.length)]
        else if (nivel === 'medio') this.palabraAdivinar = palabrasMedios[Math.floor(Math.random() * palabrasMedios.length)]
        else if (nivel === 'dificil') this.palabraAdivinar = palabrasDificiles[Math.floor(Math.random() * palabrasDificiles.length)]

    }

    verificarLetra = (letra: string) => {
        letra = letra.toLowerCase()
        if (letra.length !== 1) return this
        // console.log('Intentos antes :: ', this.intentos)
        // console.log('Intentos despues :: ', this.intentos)
        // console.log('letter : ', letra)
        // this.palabraAdivinar = this.palabraAdivinar.toLowerCase()
        if (this.palabraAdivinar.toLowerCase().includes(letra)) {
            // update user word with the letter
            this.palabraAdivinar.split('').map((l, index) => {
                if (l == letra) this.palabraUsuario[index] = letra
            })

        } else {
            this.intentos = this.intentos - 1

            this.letrasErradas.push(letra)
        }
        return this
    }

    finJuego = () => {
        return this.palabraUsuario.join('') === this.palabraAdivinar ? 'Ganaste' : this.intentos === 0 ? 'Perdiste' : 'Continua'
    }


    reiniciarJuego = () => {
        this.palabraUsuario = []
        this.letrasErradas = []
        this.intentos = this.MAX_INTENTOS
    }

}
