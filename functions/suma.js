function suma_dos_numeros(a, b) {
    return a + b;
}

const multiplicar = (a, b) => a * b;
const suma_varios_numeros = (...a) => a.reduce( (ac, cur) => ac + cur , 0  )

module.exports = {suma_dos_numeros, multiplicar, suma_varios_numeros};
 
// const suma_varios_numeros = (a + b) => { return  a + b} 