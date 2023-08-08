describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })
  it('Login sin exito', () => {
    cy.contains(/Inicia sesión/i)
    cy.get('.test-email').type('danache@gmail.com')
    cy.get('.test-password').type('test12344')
    cy.get('#sign-up').click()
    cy.contains(/Correo o contraseña incorrectos/i)
    cy.location('pathname').should('eq', '/sign-in')

  })
  it('Login con exito', () => {
    cy.contains(/Inicia sesión/i)
    cy.get('.test-email').type('danache@gmail.com')
    cy.get('.test-password').type('test1234')
    cy.get('#sign-up').click()
    cy.contains(/Correo o contraseña incorrectos/i).should('not.exist')
    cy.location('pathname').should('eq', '/')
  })
})