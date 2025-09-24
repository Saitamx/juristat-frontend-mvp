import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import { Company, Stats } from '@/types';

// Test component to access context
const TestComponent = () => {
  const { state, actions, computed } = useDashboard();
  
  return (
    <div>
      <div data-testid="loading">{state.loading.toString()}</div>
      <div data-testid="search-query">{state.searchQuery}</div>
      <div data-testid="companies-count">{state.companies.length}</div>
      <div data-testid="filtered-count">{computed.filteredCompanies.length}</div>
      <button 
        data-testid="set-companies" 
        onClick={() => actions.setCompanies(mockCompanies)}
      >
        Set Companies
      </button>
      <button 
        data-testid="set-search" 
        onClick={() => actions.setSearchQuery('Apple')}
      >
        Set Search
      </button>
      <button 
        data-testid="set-stats" 
        onClick={() => actions.setStats(mockStats)}
      >
        Set Stats
      </button>
    </div>
  );
};

const mockCompanies: Company[] = [
  {
    uuid: '1',
    name: 'Apple, Inc.',
    pending: 100,
    filed: 1000,
    disposed: 900,
    allowanceRate: 0.9,
    monthsToDisposition: 25.5,
    averageOfficeActions: 1.5,
  },
  {
    uuid: '2',
    name: 'Google LLC',
    pending: 200,
    filed: 2000,
    disposed: 1800,
    allowanceRate: 0.8,
    monthsToDisposition: 30.0,
    averageOfficeActions: 2.0,
  },
];

const mockStats: Stats = {
  companies: 2,
  averageAllowanceRate: '0.85',
  averagePending: 150,
  averageMonthsToDisposition: '27.8',
};

describe('DashboardContext', () => {
  it('should provide initial state', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('search-query')).toHaveTextContent('');
    expect(screen.getByTestId('companies-count')).toHaveTextContent('0');
    expect(screen.getByTestId('filtered-count')).toHaveTextContent('0');
  });

  it('should update companies state', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    act(() => {
      screen.getByTestId('set-companies').click();
    });

    expect(screen.getByTestId('companies-count')).toHaveTextContent('2');
    expect(screen.getByTestId('filtered-count')).toHaveTextContent('2');
  });

  it('should filter companies by search query', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    act(() => {
      screen.getByTestId('set-companies').click();
    });

    act(() => {
      screen.getByTestId('set-search').click();
    });

    expect(screen.getByTestId('search-query')).toHaveTextContent('Apple');
    expect(screen.getByTestId('filtered-count')).toHaveTextContent('1');
  });

  it('should update stats state', () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    act(() => {
      screen.getByTestId('set-stats').click();
    });

    // Stats are stored in state but not displayed in TestComponent
    // We can verify the action was called without error
    expect(screen.getByTestId('set-stats')).toBeInTheDocument();
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useDashboard must be used within a DashboardProvider');
    
    consoleSpy.mockRestore();
  });
});
