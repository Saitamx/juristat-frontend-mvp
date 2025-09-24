'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { Company, Stats, DashboardState, SortField, SortOrder } from '@/types';

// Action types
type DashboardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COMPANIES'; payload: Company[] }
  | { type: 'SET_STATS'; payload: Stats }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT'; payload: { field: SortField; order: SortOrder } }
  | { type: 'SET_SELECTED_COMPANY'; payload: Company | null }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: DashboardState = {
  companies: [],
  stats: null,
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  selectedCompany: null,
};

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_COMPANIES':
      return { ...state, companies: action.payload, loading: false, error: null };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SORT':
      return { 
        ...state, 
        sortBy: action.payload.field, 
        sortOrder: action.payload.order 
      };
    case 'SET_SELECTED_COMPANY':
      return { ...state, selectedCompany: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context
interface DashboardContextType {
  state: DashboardState;
  actions: {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCompanies: (companies: Company[]) => void;
    setStats: (stats: Stats) => void;
    setSearchQuery: (query: string) => void;
    setSort: (field: SortField, order: SortOrder) => void;
    setSelectedCompany: (company: Company | null) => void;
    resetState: () => void;
  };
  computed: {
    filteredCompanies: Company[];
    sortedCompanies: Company[];
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
interface DashboardProviderProps {
  children: React.ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Actions
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setCompanies = useCallback((companies: Company[]) => {
    dispatch({ type: 'SET_COMPANIES', payload: companies });
  }, []);

  const setStats = useCallback((stats: Stats) => {
    dispatch({ type: 'SET_STATS', payload: stats });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const setSort = useCallback((field: SortField, order: SortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { field, order } });
  }, []);

  const setSelectedCompany = useCallback((company: Company | null) => {
    dispatch({ type: 'SET_SELECTED_COMPANY', payload: company });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  // Computed values
  const filteredCompanies = useMemo(() => {
    if (!state.searchQuery) return state.companies;
    
    const query = state.searchQuery.toLowerCase();
    return state.companies.filter(company =>
      company.name.toLowerCase().includes(query)
    );
  }, [state.companies, state.searchQuery]);

  const sortedCompanies = useMemo(() => {
    const companies = [...filteredCompanies];
    
    return companies.sort((a, b) => {
      const aValue = a[state.sortBy];
      const bValue = b[state.sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return state.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return state.sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredCompanies, state.sortBy, state.sortOrder]);

  const contextValue = useMemo(() => ({
    state,
    actions: {
      setLoading,
      setError,
      setCompanies,
      setStats,
      setSearchQuery,
      setSort,
      setSelectedCompany,
      resetState,
    },
    computed: {
      filteredCompanies,
      sortedCompanies,
    },
  }), [
    state,
    setLoading,
    setError,
    setCompanies,
    setStats,
    setSearchQuery,
    setSort,
    setSelectedCompany,
    resetState,
    filteredCompanies,
    sortedCompanies,
  ]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook to use the context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
