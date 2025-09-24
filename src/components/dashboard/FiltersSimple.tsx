'use client';

import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Toggle } from '@/components/ui/Toggle';
import { Badge } from '@/components/ui/Badge';
import { 
  FilterIcon, 
  XIcon, 
  SearchIcon,
  TrendingUpIcon,
  CalendarIcon
} from 'lucide-react';

interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  minAllowanceRate: number;
  maxAllowanceRate: number;
  minProsecutionTime: number;
  maxProsecutionTime: number;
  minPatentCount: number;
  maxPatentCount: number;
}

interface FiltersSimpleProps {
  onFiltersChange: (filters: Record<string, unknown>) => void;
  onClearFilters: () => void;
}

export const Filters = memo(({ onFiltersChange, onClearFilters }: FiltersSimpleProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    minAllowanceRate: 0,
    maxAllowanceRate: 100,
    minProsecutionTime: 0,
    maxProsecutionTime: 60,
    minPatentCount: 0,
    maxPatentCount: 10000,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
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
      minProsecutionTime: 0,
      maxProsecutionTime: 60,
      minPatentCount: 0,
      maxPatentCount: 10000,
    };
    setFilters(defaultFilters);
    onClearFilters();
  };

  const getSortOptions = () => [
    { value: 'name', label: 'Company Name' },
    { value: 'allowanceRate', label: 'Allowance Rate' },
    { value: 'monthsToDisposition', label: 'Months to Disposition' },
    { value: 'pending', label: 'Pending Patents' },
  ];

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== 'name' && value !== 'asc' && 
    (typeof value === 'number' ? value !== 0 && value !== 100 && value !== 60 && value !== 10000 : true)
  ).length;

  return (
    <Card className="border-primary-200 bg-primary-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                options={getSortOptions()}
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Order</label>
              <Select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                options={[
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' },
                ]}
              />
            </div>

            {/* Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Advanced Filters</label>
              <div className="flex items-center space-x-2">
                <Toggle
                  checked={showAdvanced}
                  onChange={setShowAdvanced}
                />
                <span className="text-sm text-muted-foreground">
                  {showAdvanced ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t">
              <h4 className="font-medium text-foreground">Range Filters</h4>
              
              <div className="grid gap-6 md:grid-cols-3">
                {/* Allowance Rate */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Min Allowance Rate</label>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={filters.minAllowanceRate}
                    onChange={(value) => handleFilterChange('minAllowanceRate', value)}
                    className="w-full"
                  />
                </div>

                {/* Prosecution Time */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Min Prosecution Time</label>
                  </div>
                  <Slider
                    min={0}
                    max={60}
                    step={1}
                    value={filters.minProsecutionTime}
                    onChange={(value) => handleFilterChange('minProsecutionTime', value)}
                    className="w-full"
                  />
                </div>

                {/* Patent Count */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium">Min Patent Count</label>
                  </div>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.minPatentCount}
                    onChange={(value) => handleFilterChange('minPatentCount', value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

Filters.displayName = 'Filters';
