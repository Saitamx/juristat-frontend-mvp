'use client';

import { memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Company, TableColumn, SortField, SortOrder } from '@/types';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { 
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronsUpDownIcon,
  Building2Icon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  FileTextIcon,
  TargetIcon
} from 'lucide-react';

interface DataTableProps {
  companies: Company[];
  loading?: boolean;
  searchQuery: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSearchChange: (query: string) => void;
  onSortChange: (field: SortField, order: SortOrder) => void;
  onCompanySelect: (company: Company) => void;
}

const getColumns = (t: ReturnType<typeof useTranslations>): TableColumn[] => [
  {
    key: 'name',
    label: t('table.columns.company'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Building2Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="font-semibold text-foreground">{value as string}</div>
      </div>
    ),
  },
  {
    key: 'pending',
    label: t('table.columns.pending'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-2">
        <ClockIcon className="h-4 w-4 text-amber-500" />
        <Badge variant="warning" className="font-medium">
          {formatNumber(value as number)}
        </Badge>
      </div>
    ),
  },
  {
    key: 'filed',
    label: t('table.columns.filed'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-2">
        <FileTextIcon className="h-4 w-4 text-blue-500" />
        <span className="font-semibold text-foreground">
          {formatNumber(value as number)}
        </span>
      </div>
    ),
  },
  {
    key: 'disposed',
    label: t('table.columns.disposed'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
        <Badge variant="success" className="font-medium">
          {formatNumber(value as number)}
        </Badge>
      </div>
    ),
  },
  {
    key: 'allowanceRate',
    label: t('table.columns.allowanceRate'),
    sortable: true,
    render: (value: unknown) => {
      const numValue = value as number;
      return (
        <div className="flex items-center gap-2">
          <TrendingUpIcon className="h-4 w-4 text-emerald-500" />
          <Badge 
            variant={numValue > 0.8 ? 'success' : numValue > 0.6 ? 'default' : 'error'}
            className="font-medium"
          >
            {formatPercentage(numValue)}
          </Badge>
        </div>
      );
    },
  },
  {
    key: 'monthsToDisposition',
    label: t('table.columns.dispositionTime'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-2">
        <ClockIcon className="h-4 w-4 text-purple-500" />
        <span className="text-muted-foreground font-medium">
          {(value as number).toFixed(1)} {t('stats.months')}
        </span>
      </div>
    ),
  },
  {
    key: 'averageOfficeActions',
    label: t('table.columns.officeActions'),
    sortable: true,
    render: (value: unknown) => (
      <div className="flex items-center gap-2">
        <TargetIcon className="h-4 w-4 text-orange-500" />
        <Badge variant="secondary" className="font-medium">
          {(value as number).toFixed(1)}
        </Badge>
      </div>
    ),
  },
];

const SortButton = memo(({ 
  field, 
  currentSortBy, 
  currentSortOrder, 
  onSortChange,
  columns
}: {
  field: SortField;
  currentSortBy: SortField;
  currentSortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
  columns: TableColumn[];
}) => {
  const isCurrentSort = currentSortBy === field;
  const newSortOrder = isCurrentSort && currentSortOrder === 'asc' ? 'desc' : 'asc';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSortChange(field, newSortOrder)}
      className="h-auto p-0 font-semibold text-foreground hover:text-primary transition-colors duration-200"
    >
      <span>{columns.find(col => col.key === field)?.label}</span>
      {isCurrentSort ? (
        currentSortOrder === 'asc' ? (
          <ArrowUpIcon className="ml-2 h-4 w-4 text-primary" />
        ) : (
          <ArrowDownIcon className="ml-2 h-4 w-4 text-primary" />
        )
      ) : (
        <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
});

SortButton.displayName = 'SortButton';

export const DataTable = memo(
  ({
    companies,
    loading,
    searchQuery,
    sortBy,
    sortOrder,
    onSearchChange,
    onSortChange,
    onCompanySelect,
  }: DataTableProps) => {
    const t = useTranslations();
    const columns = getColumns(t);
    
    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
      },
      [onSearchChange]
    );

    if (loading) {
      return (
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="h-6 bg-muted/50 rounded-lg w-1/4 mb-2 shimmer"></div>
            <div className="h-10 bg-muted/50 rounded-lg w-full shimmer"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-lg shimmer"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {t('table.title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('table.subtitle')}
            </p>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('table.searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearch}
              className="max-w-sm pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/40"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground bg-muted/30"
                    >
                      {column.sortable ? (
                        <SortButton
                          field={column.key}
                          currentSortBy={sortBy}
                          currentSortOrder={sortOrder}
                          onSortChange={onSortChange}
                          columns={columns}
                        />
                      ) : (
                        column.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {companies.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-muted/50 rounded-full">
                          <SearchIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">{t('table.noResults')}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('table.noResultsSubtitle')}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  companies.map((company, index) => (
                    <tr
                      key={company.uuid}
                      className="group hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:shadow-sm"
                      onClick={() => onCompanySelect(company)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4 text-sm">
                          {column.render
                            ? column.render(company[column.key], company)
                            : company[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }
);

DataTable.displayName = 'DataTable';