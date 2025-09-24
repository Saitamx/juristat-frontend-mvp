'use client';

import { useState, useEffect, useCallback } from 'react';
import { Company, Stats } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';

interface UseApiOptions {
  immediate?: boolean;
}

export function useCompanies(options: UseApiOptions = {}) {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/data`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const companies = await response.json();
      setData(companies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchCompanies();
    }
  }, [fetchCompanies, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchCompanies,
  };
}

export function useStats(options: UseApiOptions = {}) {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const stats = await response.json();
      setData(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchStats();
    }
  }, [fetchStats, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchStats,
  };
}

export function useApiData() {
  const companies = useCompanies();
  const stats = useStats();

  return {
    companies: companies.data,
    stats: stats.data,
    loading: companies.loading || stats.loading,
    error: companies.error || stats.error,
    refetch: () => {
      companies.refetch();
      stats.refetch();
    },
  };
}
