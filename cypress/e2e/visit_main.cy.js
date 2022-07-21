describe('Visit first page, and check content', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('main').contains('Inventory')
  })
})
