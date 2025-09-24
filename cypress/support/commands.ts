/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      waitForApiCalls(): Chainable<void>
      isInViewport(): Chainable<Element>
      shouldShowLoading(): Chainable<void>
      shouldNotShowLoading(): Chainable<void>
    }
  }
}

// Custom command to wait for API calls to complete
Cypress.Commands.add('waitForApiCalls', () => {
  cy.intercept('GET', '**/data').as('getData')
  cy.intercept('GET', '**/stats').as('getStats')
  cy.wait(['@getData', '@getStats'])
})

// Custom command to check if element is visible in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect()
  expect(rect.top).to.be.at.least(0)
  expect(rect.left).to.be.at.least(0)
  expect(rect.bottom).to.be.at.most(Cypress.config('viewportHeight'))
  expect(rect.right).to.be.at.most(Cypress.config('viewportWidth'))
  return cy.wrap(subject)
})

// Custom command to check loading states
Cypress.Commands.add('shouldShowLoading', () => {
  cy.get('[data-testid="loading-spinner"]').should('be.visible')
})

Cypress.Commands.add('shouldNotShowLoading', () => {
  cy.get('[data-testid="loading-spinner"]').should('not.exist')
})
