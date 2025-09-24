// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  // Mock fetch to avoid real API calls during tests
  cy.stub(win, 'fetch').callsFake((url) => {
    if (url.includes('/data')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            uuid: 'test-uuid-1',
            name: 'Test Company 1',
            pending: 100,
            filed: 1000,
            disposed: 900,
            allowanceRate: 0.9,
            monthsToDisposition: 25.5,
            averageOfficeActions: 1.5,
          },
          {
            uuid: 'test-uuid-2',
            name: 'Test Company 2',
            pending: 200,
            filed: 2000,
            disposed: 1800,
            allowanceRate: 0.8,
            monthsToDisposition: 30.0,
            averageOfficeActions: 2.0,
          },
        ]),
      })
    }
    if (url.includes('/stats')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          companies: 2,
          averageAllowanceRate: '0.85',
          averagePending: 150,
          averageMonthsToDisposition: '27.8',
        }),
      })
    }
    return Promise.reject(new Error('Unmocked fetch request'))
  })
})
