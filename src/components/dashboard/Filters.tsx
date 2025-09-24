'use client';

import { memo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Toggle } from '@/components/ui/Toggle';
import { 
  SearchIcon, 
  FilterIcon, 
  XIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  BarChart3Icon
} from 'lucide-react';

interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  minAllowanceRate: number;
  maxAllowanceRate: number;
  minPending: number;
  maxPending: number;
  showHighPerformers: boolean;
  showRecentData: boolean;
}

interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  initialFilters?: Partial<FilterState>;
}

const getSortOptions = (t: ReturnType<typeof useTranslations>) => [
  { value: 'name', label: t('filters.sortOptions.companyName') },
  { value: 'pending', label: t('filters.sortOptions.pendingApplications') },
  { value: 'filed', label: t('filters.sortOptions.filedApplications') },
  { value: 'disposed', label: t('filters.sortOptions.disposedApplications') },
  { value: 'allowanceRate', label: t('filters.sortOptions.allowanceRate') },
  { value: 'monthsToDisposition', label: t('filters.sortOptions.dispositionTime') },
  { value: 'averageOfficeActions', label: t('filters.sortOptions.officeActions') },
];

export const Filters = memo(({ onFiltersChange, onClearFilters, initialFilters }: FiltersProps) => {
  const t = useTranslations();
  const sortOptions = getSortOptions(t);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    minAllowanceRate: 0,
    maxAllowanceRate: 100,
    minPending: 0,
    maxPending: 10000,
    showHighPerformers: false,
    showRecentData: false,
    ...initialFilters,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters: FilterState = {
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc',
      minAllowanceRate: 0,
      maxAllowanceRate: 100,
      minPending: 0,
      maxPending: 10000,
      showHighPerformers: false,
      showRecentData: false,
    };
    setFilters(defaultFilters);
    onClearFilters();
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FilterIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{t('filters.title')}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t('filters.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? <XIcon className="h-4 w-4" /> : <FilterIcon className="h-4 w-4" />}
              {isExpanded ? t('filters.collapse') : t('filters.expand')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              {t('filters.clearAll')}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <SearchIcon className="h-4 w-4" />
              {t('filters.searchCompanies')}
            </label>
            <Input
              placeholder={t('filters.searchPlaceholder')}
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="bg-background/50 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              {t('filters.sortBy')}
            </label>
            <Select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              options={sortOptions}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              {filters.sortOrder === 'asc' ? (
                <TrendingUpIcon className="h-4 w-4" />
              ) : (
                <TrendingDownIcon className="h-4 w-4" />
              )}
              {t('filters.sortOrder')}
            </label>
            <Select
              value={filters.sortOrder}
              onChange={(e) => updateFilter('sortOrder', e.target.value as 'asc' | 'desc')}
              options={[
                { value: 'asc', label: t('filters.ascending') },
                { value: 'desc', label: t('filters.descending') },
              ]}
            />
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Allowance Rate Range */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4" />
                  Allowance Rate Range
                </h4>
                <div className="space-y-4">
                  <Slider
                    label="Minimum Allowance Rate"
                    min={0}
                    max={100}
                    value={filters.minAllowanceRate}
                    onChange={(value) => updateFilter('minAllowanceRate', value)}
                  />
                  <Slider
                    label="Maximum Allowance Rate"
                    min={0}
                    max={100}
                    value={filters.maxAllowanceRate}
                    onChange={(value) => updateFilter('maxAllowanceRate', value)}
                  />
                </div>
              </div>

              {/* Pending Applications Range */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Pending Applications Range
                </h4>
                <div className="space-y-4">
                  <Slider
                    label="Minimum Pending"
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.minPending}
                    onChange={(value) => updateFilter('minPending', value)}
                  />
                  <Slider
                    label="Maximum Pending"
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.maxPending}
                    onChange={(value) => updateFilter('maxPending', value)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Toggles */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Filters</h4>
              <div className="flex flex-wrap gap-6">
                <Toggle
                  label="Show High Performers Only"
                  checked={filters.showHighPerformers}
                  onChange={(checked) => updateFilter('showHighPerformers', checked)}
                  variant="success"
                />
                <Toggle
                  label="Show Recent Data Only"
                  checked={filters.showRecentData}
                  onChange={(checked) => updateFilter('showRecentData', checked)}
                  variant="accent"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

Filters.displayName = 'Filters';
