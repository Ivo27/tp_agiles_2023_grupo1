const { verificarLetra, actualizarIntentos, completarPalabra, verificarFinJuego, palabraErradas } = require('../app.js');

test('Verificar si una letra esta en la palabra', () => {
    expect(verificarLetra('a', 'javascript')).toBeTruthy();
});
test('Verificar si una letra no esta en la palabra', () => {
    expect(verificarLetra('x', 'javascript')).toBeFalsy();
});

test('Verificar si pasa una sola letra', () => {
    expect(verificarLetra('xs', 'javascript')).toBeFalsy()
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


test('Validar si la letra erronea se agrego ', () => {
    expect(palabraErradas('javascript', 'q' , [])).toStrictEqual(['q'])
});

test('Validar si la letra correcta no se agrega ', () => {
    expect(palabraErradas('javascript', 't' , [])).toBeFalsy()
});

test('Validar si la letra erronea se agrego a la lista previa ', () => {
    expect(palabraErradas('javascript', 'q' , ['o'])).toStrictEqual(['o','q'])
});


test('Fin de juego con ganador', () => {
    expect(verificarFinJuego('javascript', 'javascript' , 2)).toStrictEqual('Ganaste')
});
test('Fin de juego sin ganador', () => {
    expect(verificarFinJuego('javascript', 'javascrit' , 0)).toStrictEqual('Perdiste')
});

