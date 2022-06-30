/// <reference types="cypress"/>

describe('index page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('oll button navigates to /oll', () => {
    cy.contains('OLL').click()
    cy.location('pathname').should('eq', '/oll')
  })

  it('pll button navigates to /pll', () => {
    cy.contains('PLL').click()
    cy.location('pathname').should('eq', '/pll')
  })
})