const { v4: uuid } = require("uuid")



const testRoomName = `testRoom:${uuid()}`

describe('Ensure a room can be added', () => {
  it('add a room modal opens', () => {
    cy.visit('http://localhost:3000/home')
    cy.get('aside button').click()
  })

  it('room can be entered into add a room modal', () => {
    cy.get('input[placeholder=\"Room name\"]').type(testRoomName).type('{enter}')
  })

  it('room appears in inventory ui', () => {
    cy.get('div h3').should('have.text', testRoomName)
  })
})

describe('Inventory item functionality', () => {
  it('item can be added', () => {
    cy.get('button').contains('Add asset').click()
    cy.get('input[placeholder=\"Asset name\"]').type('This is an asset')
    cy.get('button').contains('Confirm').click()
  })
  
  it('item can be removed', () => {
    cy.wait(3000).then(() => { cy.get('button').contains('Delete item').click() })
    cy.get('button').contains('Confirm').click()
  })
})

describe('Room can be deleted', () => {
  it('deletes room when clicked', () => {
    cy.wait(5000).get('button').contains('Delete room').click()
    cy.get('button').contains('Confirm').click()
  })
})