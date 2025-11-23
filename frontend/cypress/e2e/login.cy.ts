describe('Test Logowania', () => {
  it('pozwala odwiedzić stronę i przejść do logowania', () => {
    cy.visit('http://localhost:5173/')

    cy.url().should('include', '/login')

    cy.contains('h1', 'Logowanie')
    cy.get('input[type="text"]').type('student2')
    cy.get('input[type="password"]').type('password123')

    cy.get('button').click()
  })
})