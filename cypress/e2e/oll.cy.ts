/// <reference types="cypress"/>

describe('oll categories', () => {
    beforeEach(() => {
        cy.visit('/oll')
    })

    it('displays title', () => {
        cy.get('h1').should('have.text', 'OLL')
    })

    it('displays back button', () => {
        cy.get('.back-button').should('exist')
        cy.get('.back-button svg').should('exist')
        cy.get('.back-button .text')
            .should('exist')
            .should('have.text', 'Back')
    })

    it('back button works', () => {
        cy.get('.back-button').click()
        cy.location().should(location => {
            expect(location.pathname).to.eq('/')
        })
    })

    
    const ollCategories = [
        'All Corners Oriented',
        'All Edges Oriented',
        'T Shapes',
        'W Shapes',
        'Square Shapes',
        'P Shapes',
        'Fish Shapes',
        'C Shapes',
        'Small Lightning Bolts',
        'Big Lightning Bolts',
        'L Shapes',
        'Knight Move Shapes',
        'I Shapes',
        'Awkward Shapes',
        'No Edges Oriented'
    ]

    Cypress.config('defaultCommandTimeout', 200)
    ollCategories.forEach(category => {
      it(`displays the '${category}' category`, () => {
        cy.get('h2').contains(category)
      })
    })
})