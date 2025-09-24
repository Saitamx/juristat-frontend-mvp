'use client';

import { memo, useMemo, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Company, SortField, SortOrder } from '@/types';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { useDebounce, useVirtualScroll, usePerformanceMonitor } from '@/hooks/usePerformance';
import { 
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline';

interface VirtualizedTableProps {
  companies: Company[];
  loading?: boolean;
  onCompanySelect: (company: Company) => void;
}

const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 400;

const TableRow = memo(({ 
  company, 
  onSelect,
  style 
}: { 
  company: Company; 
  onSelect: (company: Company) => void;
  style?: React.CSSProperties;
}) => {
  const handleClick = useCallback(() => {
    onSelect(company);
  }, [company, onSelect]);

  return (
    <div
      style={style}
      className="flex items-center border-b border-border hover:bg-muted/50 cursor-pointer transition-colors px-4"
      onClick={handleClick}
    >
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate">{company.name}</div>
      </div>
      <div className="w-24 text-center">
        <Badge variant="warning">{formatNumber(company.pending)}</Badge>
      </div>
      <div className="w-24 text-center">
        <span className="text-foreground">{formatNumber(company.filed)}</span>
      </div>
      <div className="w-24 text-center">
        <Badge variant="success">{formatNumber(company.disposed)}</Badge>
      </div>
      <div className="w-32 text-center">
        <Badge 
          variant={company.allowanceRate > 0.8 ? 'success' : company.allowanceRate > 0.6 ? 'default' : 'error'}
        >
          {formatPercentage(company.allowanceRate)}
        </Badge>
      </div>
      <div className="w-32 text-center">
        <span className="text-muted-foreground">{company.monthsToDisposition.toFixed(1)} months</span>
      </div>
      <div className="w-24 text-center">
        <Badge variant="secondary">{company.averageOfficeActions.toFixed(1)}</Badge>
      </div>
    </div>
  );
});

TableRow.displayName = 'TableRow';

const SortButton = memo(({ 
  field, 
  currentSort, 
  currentOrder, 
  onSort 
}: {
  field: SortField;
  currentSort: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField, order: SortOrder) => void;
}) => {
  const handleClick = useCallback(() => {
    const newOrder = currentSort === field && currentOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  }, [field, currentSort, currentOrder, onSort]);

  const getIcon = () => {
    if (currentSort !== field) {
      return <ChevronUpDownIcon className="h-4 w-4" />;
    }
    return currentOrder === 'asc' 
      ? <ChevronUpIcon className="h-4 w-4" />
      : <ChevronDownIcon className="h-4 w-4" />;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="h-auto p-1 hover:bg-muted"
    >
      {getIcon()}
    </Button>
  );
});

SortButton.displayName = 'SortButton';

export const VirtualizedTable = memo(({
  companies,
  loading,
  onCompanySelect,
}: VirtualizedTableProps) => {
  usePerformanceMonitor('VirtualizedTable');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;
    
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = companies.filter(company =>
        company.name.toLowerCase().includes(query)
      );
    }
    
    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  }, [companies, debouncedSearchQuery, sortBy, sortOrder]);

  const { visibleItems, totalHeight, offsetY, handleScroll } = useVirtualScroll(
    filteredAndSortedCompanies,
    ITEM_HEIGHT,
    CONTAINER_HEIGHT
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSort = useCallback((field: SortField, order: SortOrder) => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Companies Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Companies Data ({filteredAndSortedCompanies.length})</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Table Header */}
        <div className="flex items-center border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <span>Company</span>
              <SortButton
                field="name"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-24 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Pending</span>
              <SortButton
                field="pending"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-24 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Filed</span>
              <SortButton
                field="filed"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-24 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Disposed</span>
              <SortButton
                field="disposed"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-32 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Allowance Rate</span>
              <SortButton
                field="allowanceRate"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-32 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Disposition Time</span>
              <SortButton
                field="monthsToDisposition"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
          <div className="w-24 text-center">
            <div className="flex items-center justify-center space-x-1">
              <span>Office Actions</span>
              <SortButton
                field="averageOfficeActions"
                currentSort={sortBy}
                currentOrder={sortOrder}
                onSort={handleSort}
              />
            </div>
          </div>
        </div>

        {/* Virtualized Table Body */}
        <div
          className="overflow-auto"
          style={{ height: CONTAINER_HEIGHT }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleItems.map(({ item: company, index }) => (
                <TableRow
                  key={company.uuid}
                  company={company}
                  onSelect={onCompanySelect}
                  style={{
                    height: ITEM_HEIGHT,
                    position: 'absolute',
                    top: index * ITEM_HEIGHT,
                    left: 0,
                    right: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {filteredAndSortedCompanies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No companies found
          </div>
        )}
      </CardContent>
    </Card>
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';
