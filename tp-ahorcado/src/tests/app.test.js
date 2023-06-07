const { PALABRA_A_ADIVINAR,verificarLetra, actualizarIntentos, completarPalabra, verificarFinJuego } = require('../app.js');

test('Verificar si una letra esta en la palabra', () => {
    expect(verificarLetra('a', PALABRA_A_ADIVINAR)).toBeTruthy();
});
test('Verificar si una letra noesta en la palabra', () => {
    expect(verificarLetra('x', PALABRA_A_ADIVINAR)).toBeFalsy();
});

test('Verificar si pasa una sola letra', () => {
    expect(verificarLetra('xs', PALABRA_A_ADIVINAR)).toBeFalsy()
});

test('Verificar los intentos', () => {
    expect(actualizarIntentos(4)).toBe(3)
});
test('Verificar los intentos en cero', () => {
    expect(actualizarIntentos(0)).toBe(0)
});
test('Completar una letra ', () => {
    expect(completarPalabra('javascript', 'j' , [])).toStrictEqual(['j'])
});
test('Completar varias letras ', () => {
    expect(completarPalabra('javascript', 'a' , [])).toStrictEqual([ , 'a',,'a'])
});
test('No completar letra', () => {
    expect(completarPalabra('javascript', 'q' , [])).toStrictEqual([])
});

test('Fin de juego con ganador', () => {
    expect(verificarFinJuego('javascript', 'javascript' , 2)).toStrictEqual('Ganaste')
});
test('Fin de juego sin ganador', () => {
    expect(verificarFinJuego('javascript', 'javascrit' , 0)).toStrictEqual('Perdiste')
});

