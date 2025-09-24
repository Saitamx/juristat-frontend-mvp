describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the dashboard successfully', () => {
    cy.contains('Patent Analytics Dashboard').should('be.visible')
    cy.contains('Comprehensive view of patent application data').should('be.visible')
  })

  it('should display stats cards', () => {
    cy.waitForApiCalls()
    
    cy.contains('Total Companies').should('be.visible')
    cy.contains('Avg Allowance Rate').should('be.visible')
    cy.contains('Avg Pending').should('be.visible')
    cy.contains('Avg Disposition Time').should('be.visible')
  })

  it('should display charts section', () => {
    cy.waitForApiCalls()
    
    cy.contains('Allowance Rate by Company').should('be.visible')
    cy.contains('Applications Overview').should('be.visible')
    cy.contains('Disposition Timeline').should('be.visible')
    cy.contains('Pending Applications Distribution').should('be.visible')
  })

  it('should display data table with companies', () => {
    cy.waitForApiCalls()
    
    cy.contains('Companies Data').should('be.visible')
    cy.get('table').should('be.visible')
    cy.contains('Test Company 1').should('be.visible')
    cy.contains('Test Company 2').should('be.visible')
  })

  it('should allow searching companies', () => {
    cy.waitForApiCalls()
    
    cy.get('input[placeholder="Search companies..."]').type('Test Company 1')
    cy.contains('Test Company 1').should('be.visible')
    cy.contains('Test Company 2').should('not.exist')
  })

  it('should allow sorting table columns', () => {
    cy.waitForApiCalls()
    
    // Click on Company column header to sort
    cy.contains('Company').click()
    cy.get('table tbody tr').first().should('contain', 'Test Company 1')
    
    // Click again to reverse sort
    cy.contains('Company').click()
    cy.get('table tbody tr').first().should('contain', 'Test Company 2')
  })

  it('should show company details when row is clicked', () => {
    cy.waitForApiCalls()
    
    cy.get('table tbody tr').first().click()
    // Add assertions for company details modal or sidebar if implemented
  })

  it('should refresh data when refresh button is clicked', () => {
    cy.waitForApiCalls()
    
    cy.contains('Refresh').click()
    cy.shouldShowLoading()
    cy.waitForApiCalls()
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 667) // iPhone SE
    cy.waitForApiCalls()
    
    cy.contains('Patent Analytics Dashboard').should('be.visible')
    cy.get('table').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Mock API error
    cy.intercept('GET', '**/data', { statusCode: 500 }).as('getDataError')
    cy.intercept('GET', '**/stats', { statusCode: 500 }).as('getStatsError')
    
    cy.visit('/')
    cy.wait(['@getDataError', '@getStatsError'])
    
    cy.contains('Error Loading Data').should('be.visible')
    cy.contains('Retry').should('be.visible')
  })
})
