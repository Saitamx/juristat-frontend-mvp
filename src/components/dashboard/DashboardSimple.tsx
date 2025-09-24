'use client';

import React, { memo, Suspense, lazy, useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { useApiData } from '@/hooks/useApi';
import { LoadingCard } from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  AlertCircleIcon, 
  RefreshCwIcon, 
  SettingsIcon
} from 'lucide-react';
import { Filters } from './FiltersSimple';
import { Header } from '@/components/HeaderSimple';

// Lazy load heavy components
const StatsCards = lazy(() => import('./StatsCardsSimple').then(m => ({ default: m.StatsCardsSimple })));
const Charts = lazy(() => import('./Charts').then(m => ({ default: m.Charts })));
const DataTable = lazy(() => import('./DataTableSimple').then(m => ({ default: m.DataTableSimple })));

const LoadingFallback = memo(() => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="h-10 bg-muted rounded w-24"></div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
    <LoadingCard />
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

export const DashboardSimple = memo(() => {
  const { actions } = useDashboard();
  const { companies, stats, loading, error, refetch } = useApiData();
  const [showFilters, setShowFilters] = useState(false);

  // Use API data directly instead of syncing with context to avoid infinite loops
  const displayCompanies = companies || [];
  const displayStats = stats;
  const displayLoading = loading;
  const displayError = error;

  const handleRetry = () => {
    refetch();
  };

  const handleFiltersChange = (filters: Record<string, unknown>) => {
    // Apply filters logic here
    console.log('Filters changed:', filters);
  };

  const handleClearFilters = () => {
    // Clear filters logic here
    console.log('Filters cleared');
  };

  if (displayError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-error-200 bg-error-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircleIcon className="h-6 w-6 text-error-600" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-error-800">
                  Error
                </h3>
                <p className="text-error-600 mt-1">
                  {displayError}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRetry}
                className="border-error-300 text-error-700 hover:bg-error-100"
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* MVP Header */}
      <Header />
      
      {/* Dashboard Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">
                Main Dashboard
              </h2>
              <p className="text-muted-foreground">
                Real-time patent data analysis
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SettingsIcon className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              <Button 
                variant="primary"
                size="lg"
                onClick={handleRetry}
                disabled={displayLoading}
                className="flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <RefreshCwIcon className={`h-4 w-4 ${displayLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Filters */}
        {showFilters && (
          <Filters
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        )}

        <Suspense fallback={<LoadingFallback />}>
          <div className="space-y-6">
            {/* Stats Cards */}
            <Suspense fallback={
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            }>
              <StatsCards stats={displayStats || undefined} loading={displayLoading} />
            </Suspense>

            {/* Charts */}
            <Suspense fallback={
              <div className="grid gap-6 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            }>
              <Charts companies={displayCompanies} loading={displayLoading} />
            </Suspense>

            {/* Data Table */}
            <Suspense fallback={<LoadingCard />}>
              <DataTable
                companies={displayCompanies}
                loading={displayLoading}
                searchQuery=""
                sortBy="name"
                sortOrder="asc"
                onSearchChange={() => {}}
                onSortChange={() => {}}
                onCompanySelect={() => {}}
              />
            </Suspense>
          </div>
        </Suspense>
      </div>
    </div>
  );
});

DashboardSimple.displayName = 'DashboardSimple';
