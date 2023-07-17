import {  expect, test } from 'vitest'
import  { Ahorcado, palabrasFaciles, palabrasMedios, palabrasDificiles }  from '../ahorcado.js'

// // const juegoFacil = new Ahorcado('facil')
// const juegoMedio = new Ahorcado('medio')
// const juegoDificil = new Ahorcado('dificil')

test('Verificar si una letra esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil')
    expect(juegoFacil.verificarLetra('a')).toBeTruthy();
});
test('Verificar si una letra no esta en la palabra', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.verificarLetra('x')).toBeFalsy();
});

test('Verificar si pasa una sola letra', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.verificarLetra('xs')).toBeFalsy()
});

test('Verificar los intentos', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.actualizarIntentos()).toBe(juegoFacil.intentos)
});
test('Verificar los intentos en cero', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.actualizarIntentos()).toBe(juegoFacil.intentos)
});
test('Completar una letra ', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.completarPalabra('j')).toStrictEqual(['j'])
});
test('Completar varias letras ', () => {
    const juegoFacil = new Ahorcado('facil')
    // eslint-disable-next-line no-sparse-arrays
    expect(juegoFacil.completarPalabra('a')).toStrictEqual([, 'a',  , 'a'])
});
test('No completar letra', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.completarPalabra('q')).toStrictEqual([])
});

test('Validar si la letra erronea se agrego ', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.agregarLetrasErradas('q')).toStrictEqual(['q'])
});

test('Validar si la letra correcta no se agrega ', () => {
    const juegoFacil = new Ahorcado('facil')

    expect(juegoFacil.agregarLetrasErradas('v')).toBeFalsy()
});

test('Validar si la letra erronea se agrego a la lista previa ', () => {
    const juegoFacil = new Ahorcado('facil')
    juegoFacil.letrasErradas = ['o']
    expect(juegoFacil.agregarLetrasErradas('q')).toStrictEqual(['o', 'q'])
});

test('Fin de juego con ganador', () => {
    const juegoFacil = new Ahorcado('facil')
    juegoFacil.palabraUsuario = ['j', 'a', 'v', 'a']
    juegoFacil.intentos = 4
    expect(juegoFacil.verificarFinJuego()).toStrictEqual('Ganaste')
});
test('Fin de juego sin ganador', () => {
    const juegoFacil = new Ahorcado('facil')
    juegoFacil.palabraUsuario = ['j', 'a']
    juegoFacil.intentos = 0
    expect(juegoFacil.verificarFinJuego()).toStrictEqual('Perdiste')
});
test('Reiniciar juego ', () => {
    const juegoFacil = new Ahorcado('facil')
    juegoFacil.palabraUsuario = ['j', 'a']
    juegoFacil.intentos = 2
    juegoFacil.completarPalabra('j')
    juegoFacil.reiniciarJuego()
    expect(juegoFacil.intentos).toBe(6)
    expect(juegoFacil.palabraUsuario).toStrictEqual([])
});


// test de otra dificultad

test('Validar juego medio', () => {
    const juegofacil = new Ahorcado('facil')
    expect(juegofacil.palabraAdivinar).toStrictEqual('java')
});
test('Validar juego medio', () => {
    const juegoMedio = new Ahorcado('medio')

    expect(juegoMedio.palabraAdivinar).toStrictEqual('python')
});
test('Validar juego dificil', () => {
    const juegodificil = new Ahorcado('dificil')

    expect(juegodificil.palabraAdivinar).toStrictEqual('javascript')
});

// test con palabras al azar 

test('Validar si la palabra elegida esta en la lista de las palabras faciles', () => {
    const juegofacil = new Ahorcado('facil', 2)
    console.log('FAC :: ', juegofacil.palabraAdivinar)

    expect(palabrasFaciles).toContain(juegofacil.palabraAdivinar)
});
test('Validar si la palabra elegida esta en la lista de las palabras medios', () => {
    const juegoMedio = new Ahorcado('medio', 2)
    console.log('MEDIO :: ', juegoMedio.palabraAdivinar)

    expect(palabrasMedios).toContain(juegoMedio.palabraAdivinar)
});
test('Validar si la palabra elegida esta en la lista de las palabras dificiles', () => {
    const juegodificil = new Ahorcado('dificil', 2)
    console.log('DIF :: ', juegodificil.palabraAdivinar)
    expect(palabrasDificiles).toContain(juegodificil.palabraAdivinar)
});
