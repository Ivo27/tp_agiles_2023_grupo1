describe('Ejecutar juego', () => {
  it('Perder por timer', () => {
    cy.visit('localhost:5173')
    cy.contains('Jugar').click()
    cy.url().should('include', '/game')
    cy.get('#levels').select('Facil')
    cy.get('.bg-red-3002 > .w-6').click()
    cy.contains('Iniciar juego').click()
    cy.wait(65000)
    cy.contains('Perdiste , vuelve a intentarlo')
  })
})