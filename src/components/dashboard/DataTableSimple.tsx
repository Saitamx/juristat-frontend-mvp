'use client';

import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  SearchIcon, 
  ChevronUpIcon, 
  ChevronDownIcon,
  Building2Icon,
  TrendingUpIcon,
  CalendarIcon,
  DollarSignIcon
} from 'lucide-react';
import { Company, TableColumn } from '@/types';

interface SortButtonProps {
  field: string;
  currentSort: { field: string; order: 'asc' | 'desc' };
  onSort: (field: string) => void;
  label: string;
}

const SortButton = memo(({ field, currentSort, onSort, label }: SortButtonProps) => {
  const isActive = currentSort.field === field;
  const isAsc = isActive && currentSort.order === 'asc';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      <span className="flex items-center gap-1">
        {label}
        {isActive ? (
          isAsc ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}
      </span>
    </Button>
  );
});

SortButton.displayName = 'SortButton';

interface DataTableSimpleProps {
  companies: Company[];
  loading?: boolean;
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSearchChange: (query: string) => void;
  onSortChange: (field: string) => void;
  onCompanySelect: (company: Company) => void;
}

export const DataTableSimple = memo(({
  companies,
  loading,
  searchQuery,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortChange,
  onCompanySelect
}: DataTableSimpleProps) => {
  const [sort, setSort] = useState({ field: sortBy, order: sortOrder });

  const columns: TableColumn[] = [
    { key: 'name', label: 'Company Name', sortable: true },
    { key: 'allowanceRate', label: 'Allowance Rate', sortable: true },
    { key: 'monthsToDisposition', label: 'Months to Disposition', sortable: true },
    { key: 'pending', label: 'Pending Patents', sortable: true },
  ];

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ field, order: newOrder });
    onSortChange(field);
  };

  const sortedCompanies = useMemo(() => {
    if (!companies.length) return [];

    return [...companies].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sort.field) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'allowanceRate':
          aValue = a.allowanceRate;
          bValue = b.allowanceRate;
          break;
        case 'monthsToDisposition':
          aValue = a.monthsToDisposition;
          bValue = b.monthsToDisposition;
          break;
        case 'pending':
          aValue = a.pending;
          bValue = b.pending;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [companies, sort]);

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return sortedCompanies;

    return sortedCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedCompanies, searchQuery]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2Icon className="h-5 w-5" />
            Company Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded animate-pulse"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2Icon className="h-5 w-5" />
            Company Data
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {filteredCompanies.length} companies
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} className="px-4 py-3 text-left">
                        {column.sortable ? (
                          <SortButton
                            field={column.key}
                            currentSort={sort}
                            onSort={handleSort}
                            label={column.label}
                          />
                        ) : (
                          <span className="font-medium">{column.label}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                        {searchQuery ? 'No companies found matching your search.' : 'No companies available.'}
                      </td>
                    </tr>
                  ) : (
                    filteredCompanies.map((company) => (
                      <tr 
                        key={company.name}
                        className="border-t hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => onCompanySelect(company)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium">{company.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono">
                              {(company.allowanceRate * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono">
                              {company.monthsToDisposition.toFixed(1)} months
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono">
                              {company.pending.toLocaleString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

DataTableSimple.displayName = 'DataTableSimple';
