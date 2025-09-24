'use client';

import React, { memo, Suspense, lazy, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDashboard } from '@/contexts/DashboardContext';
import { useApiData } from '@/hooks/useApi';
import { LoadingCard } from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  AlertCircleIcon, 
  RefreshCwIcon, 
  SettingsIcon, 
  SparklesIcon
} from 'lucide-react';
import { Filters } from './Filters';
import { Header } from '@/components/Header';

// Lazy load heavy components
const StatsCards = lazy(() => import('./StatsCards').then(m => ({ default: m.StatsCards })));
const Charts = lazy(() => import('./Charts').then(m => ({ default: m.Charts })));
const DataTable = lazy(() => import('./DataTable').then(m => ({ default: m.DataTable })));

const LoadingFallback = memo(() => (
  <div className="space-y-8 p-6">
    <div className="flex items-center justify-between">
      <div className="h-8 bg-muted/50 rounded-lg w-1/4 shimmer"></div>
      <div className="h-12 bg-muted/50 rounded-xl w-32 shimmer"></div>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

export const Dashboard = memo(() => {
  const t = useTranslations('dashboard');
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

  const handleFiltersChange = (filters: {
    searchQuery: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    minAllowanceRate: number;
    maxAllowanceRate: number;
    minPending: number;
    maxPending: number;
    showHighPerformers: boolean;
    showRecentData: boolean;
  }) => {
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
                  {t('common.error')}
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
                {t('common.retry')}
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
                {t('title')}
              </h2>
              <p className="text-muted-foreground">
                {t('subtitle')}
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
                {showFilters ? t('hideFilters') : t('showFilters')}
              </Button>
              
              <Button 
                variant="primary"
                size="lg"
                onClick={handleRetry}
                disabled={displayLoading}
                className="flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <RefreshCwIcon className={`h-4 w-4 ${displayLoading ? 'animate-spin' : ''}`} />
                <span>{t('refresh')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Filters */}
        {showFilters && (
          <Suspense fallback={<LoadingCard />}>
            <Filters
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </Suspense>
        )}

        {/* Stats Cards */}
        <Suspense fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        }>
          <StatsCards stats={displayStats} loading={displayLoading} />
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
            onSearchChange={actions.setSearchQuery}
            onSortChange={actions.setSort}
            onCompanySelect={actions.setSelectedCompany}
          />
        </Suspense>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          variant="accent"
          size="lg"
          className="rounded-full shadow-2xl hover:shadow-3xl animate-float"
        >
          <SparklesIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';