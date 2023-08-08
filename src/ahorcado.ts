


// create a list of easy work between 5 and 10 letters 
/*
const palabrasFaciles = [
    "juz",
    "tema",
    "flor",
    "casa",
    "río",
    "paz",
    "vino",
    "mal",
    "hoy",
    "pico",
    "taza",
    "mesa",
    "oso",
    "calor",
    "pez",
    "nieve",
    "ver",
    "sol",
    "sol",
    "piel",
    "seda",
    "foto",
    "pino",
    "azul",
    "pan",
    "amar",
    "más",
    "paz",
    "fino",
    "luz",
    "nube",
    "rey",
    "fiel",
    "sal",
    "piso",
    "nuez",
    "hola",
    "cola",
    "sol",
    "uva",
    "malo",
    "rico",
    "sano",
    "faro",
    "arte",
    "alma",
    "amor",
    "ver",
    "leal",
    "real",
    "topo",
    "gato",
    "base",
    "eje",
    "peor",
    "caos",
    "gasa",
    "león",
    "miel",
    "mes",
    "rock",
    "mar",
    "rayo",
    "hada",
    "oso",
    "muerte",
    "botón",
    "miel",
    "tren",
    "alma",
    "clan",
    "taza",
    "reír",
    "sal",
    "iris",
    "vino",
    "café",
    "piso",
    "sal",
    "herir",
    "caos",
    "sal",
    "oral",
    "seda",
    "parte",
    "arte",
    "más",
    "beso",
    "peor",
    "sal",
    "caos",
    "pez",
    "miel",
    "malo",
    "flor",
    "beso",
    "más",
    "casa",
    "miel",
    "pez",
    "real",
    "fe",
    "jaula",
    "cama",
    "rayo",
    "calor",
    "mal",
    "jaula",
    "flor",
    "taza",
    "pez",
    "pez",
];

*/

// create a list of medium work between 10 and 15 letters
const palabrasMedios = [
    "montaña",
    "verano",
    "caminar",
    "manzana",
    "programa",
    "estrella",
    "teclado",
    "guitarra",
    "pescado",
    "artículo",
    "felicidad",
    "naranja",
    "escritor",
    "dormir",
    "teléfono",
    "telescopio",
    "gimnasio",
    "comida",
    "agujero",
    "pastel",
    "radio",
    "velocidad",
    "ventana",
    "tienda",
    "sonrisa",
    "caballo",
    "montar",
    "madera",
    "moneda",
    "computadora",
    "mesa",
    "chocolate",
    "amigo",
    "libro",
    "animal",
    "persona",
    "deporte",
    "silla",
    "perro",
    "gato",
    "historia",
    "papel",
    "fiesta",
    "regalo",
    "camino",
    "mercado",
    "hermano",
    "encender",
    "carrera",
    "escalera",
    "estudiar",
    "canción",
    "jardín",
    "espada",
    "motor",
    "computar",
    "carpeta",
    "colina",
    "brazo",
    "planta",
    "pantalla",
    "sombra",
    "maestro",
    "bebida",
    "número",
    "viaje",
    "teatro",
    "volar",
    "volante",
    "pintura",
    "regresar",
    "escuela",
    "hermana",
    "zapato",
    "tarjeta",
    "bibliote",
    "montaña",
    "pasado",
    "elegante",
    "hamburgu",
    "coche",
    "sorpresa",
    "disco",
    "gafas",
    "pasillo",
    "esperar",
    "bosque",
    "estación",
    "señal",
    "taller",
    "viajar",
    "gafas",
    "barco",
    "casino",
    "problema",
    "crucero",
    "retrato",
    "música",
    "periodo",
    "palacio",
    "ganador",
    "cuerda",
];

// create a list of hard work between 15 and 20 letters
const palabrasDificiles = [
    "bicicletas",
    "elefantes",
    "computadora",
    "combinación",
    "independiente",
    "amplificador",
    "elefante",
    "camaradería",
    "circunstancia",
    "ferrocarril",
    "particular",
    "hospitalario",
    "circunferencia",
    "transparencia",
    "congratulación",
    "categorización",
    "abecedario",
    "creatividad",
    "diferencia",
    "espectacular",
    "fotografía",
    "generosidad",
    "helicóptero",
    "impresionante",
    "jurisdicción",
    "laboratorio",
    "magnitud",
    "naturaleza",
    "obligatorio",
    "perpendicular",
    "quintuplicar",
    "responsable",
    "satisfactorio",
    "telégrafo",
    "uniformidad",
    "velocímetro",
    "xilófono",
    "yacimiento",
    "zancadilla",
    "abastecedor",
    "borrachera",
    "colchoneta",
    "delicadeza",
    "especialista",
    "formalidad",
    "gratitud",
    "huracán",
    "igualdad",
    "jubilación",
    "kiosco",
    "laberinto",
    "manuscrito",
    "navegación",
    "oportunidad",
    "peregrinación",
    "quietud",
    "rebelión",
    "secretaria",
    "tranquilidad",
    "ultrasonido",
    "veracidad",
    "wisconsin",
    "xenofobia",
    "yogur",
    "zapatería",
    "abstención",
    "boicot",
    "conjetura"]


const palabrasFaciles = ['flor']

export type NIVEL = 'facil' | 'medio' | 'dificil'

export class Ahorcado {
    MAX_INTENTOS = 8
    TIMER = 0
    nivel: string;
    intentos: number;
    palabraUsuario: string[];
    letrasErradas: string[];
    palabraAdivinar: string;
    allInputs: string[] = []

    // create a constructor with the parameters
    constructor(nivel: NIVEL = 'facil') {
        this.palabraAdivinar = ''
        this.nivel = nivel
        // if (nivel === 'facil' || nivel === 'medio') this.MAX_INTENTOS = 
        this.intentos = this.MAX_INTENTOS
        this.palabraUsuario = []
        this.letrasErradas = []
        if (nivel === 'facil') {
            this.palabraAdivinar = this.removeAccents(palabrasFaciles[Math.floor(Math.random() * palabrasFaciles.length)])
            this.TIMER = 60
        }
        else if (nivel === 'medio') {
            this.palabraAdivinar = this.removeAccents(palabrasMedios[Math.floor(Math.random() * palabrasMedios.length)])
            this.TIMER = 145
        }
        else if (nivel === 'dificil') {
            this.palabraAdivinar = this.removeAccents(palabrasDificiles[Math.floor(Math.random() * palabrasDificiles.length)])
            this.TIMER = 240
        }

    }

    removeAccents = (word: string) => {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    verificarLetra = (letra: string) => {
        letra = letra.toLowerCase()
        if (letra.length !== 1) return this
        this.allInputs.push(letra)
        if (this.palabraAdivinar.toLowerCase().includes(letra)) {
            this.palabraAdivinar.split('').map((l, index) => {
                if (l == letra) this.palabraUsuario[index] = letra
            })

        } else {
            this.intentos = this.intentos - 1
            this.letrasErradas.push(letra)
        }
        return this
    }

    finJuego = () => this.palabraUsuario.join('') === this.palabraAdivinar ? 'Ganaste' : this.intentos === 0 ? 'Perdiste' : 'Continua'

    reiniciarJuego = () => {
        this.palabraUsuario = []
        this.letrasErradas = []
        this.intentos = this.MAX_INTENTOS
        this.allInputs = []
    }

}
