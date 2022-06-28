/// <reference types="cypress"/>

describe('index page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays oll button first', () => {
    cy.get('button .text').first().should('have.text', 'OLL')
  })

  it('displays pll button second', () => {
    cy.get('button .text').last().should('have.text', 'PLL')
  })

  it('oll button navigates to /oll', () => {
    cy.contains('OLL').click()
    cy.location().should(location => {
      expect(location.pathname).to.eq('/oll')
    })
  })

  it('pll button navigates to /pll', () => {
    cy.contains('PLL').click()
    cy.location().should(location => {
      expect(location.pathname).to.eq('/pll')
    })
  })
})