describe('template spec', () => {
    beforeEach(() => { cy.visit('localhost:5173/sign-up') })
    it('Register sin exito', () => {
        cy.contains(/Inicia sesión/i)
        cy.get('.test-fullName').type('test-cypress')
        cy.get('.test-email').type('danache@gmail.com')
        cy.get('.test-password').type('test12344')
        cy.get('#test-sign-up').click()
        cy.contains(/Ya existe otra cuenta con ese correo/i)
        cy.location('pathname').should('eq', '/sign-up')

    })
    it('Register con exito', () => {
        cy.contains(/Inicia sesión/i)
        cy.get('.test-fullName').type('test-cypress')
        cy.get('.test-email').type(`cypress${new Date().getTime()}@test.co`)
        cy.get('.test-password').type('test1234')
        cy.get('#test-sign-up').click()
        cy.contains(/Ya existe otra cuenta con ese correo/i).should('not.exist')
        cy.location('pathname').should('eq', '/')
        cy.contains(/test-cypress/i)
    })
})