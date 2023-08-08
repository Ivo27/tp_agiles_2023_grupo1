describe('Ejecutar juego', () => {
  it('Ganar Juego', () => {
    cy.visit('/')
    cy.contains('Jugar').click()
    cy.url().should('include', '/game')
    cy.get('#levels').select('Facil')
    cy.get('.bg-red-3003 > .w-6').click()
    cy.contains('Iniciar juego').click()
    cy.get('.letters > :nth-child(6)').click()
    cy.get('.letters > :nth-child(12)').click()
    cy.get('.letters > :nth-child(15)').click()
    cy.get('.letters > :nth-child(18)').click()
    cy.contains('Felicidades , ganaste')
  })
})