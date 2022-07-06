/// <reference types="cypress"/>

describe('pll permutations', () => {
    beforeEach(() => {
        cy.visit('/pll')
    })

    it('displays title', () => {
        cy.get('h1').should('have.text', 'PLL')
    })

    it('displays back button', () => {
        cy.get('.back-button').should('exist')
        cy.get('.back-button svg').should('exist')
        cy.get('.back-button .text')
            .should('exist')
            .should('have.text', 'Back')
    })

    it('back button works', () => {
        cy.get('.back-button').click({timeout: 3000})
        cy.location('pathname').should('eq', '/')
    })

    
    const pllPermutations = [
        'Edges Only',
        'Corners Only',
        'Adjacent Corner Swap',
        'Diagonal Corner Swap',
        'G Permutations'
    ]

    pllPermutations.forEach(permutation => {
      it(`displays the '${permutation}' permutation`, () => {
        cy.get('h2').contains(permutation)
      })
    })

    it('saves foldout states', () => {
        cy.wait(150)
        cy.contains('Edges Only').click()
        cy.contains('Ua').click()
        cy.contains('Back').click()
        cy.contains('Ua')
    })
})