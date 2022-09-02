describe('Visit landing page, and ensure it contains call to action button.', () => {
  it('Contains cta text', () => {
    cy.visit('http://localhost:3000')
    cy.get('main').contains('Try it now!')
  })
})
