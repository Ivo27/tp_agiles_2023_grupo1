const {suma_dos_numeros, multiplicar, suma_varios_numeros } = require('../functions/suma')
test('Suma dos numeros enteros positivos', () => {
    expect(suma_dos_numeros(1,2)).toBe(3);
  });

  test('Suma dos numeros enteros, uno negativo', () => {
    expect(suma_dos_numeros(5,-3)).toBe(2);
  });

  test('Suma dos numeros enteros iguales', () => {
    expect(suma_dos_numeros(6,6)).toBe(12);
  });

  test('Suma ceros', () => {
    expect(suma_dos_numeros(0,0)).toBe(0);
  });

  test('Multiplicar dos numeros enteros positivos', () => {
    expect(multiplicar(1,2)).toBe(2);
  });
  test('Sumar varios  numeros enteros positivos', () => {
    expect(suma_varios_numeros(1,1,1,1)).toBe(4);
  });

  