export interface Company {
  uuid: string;
  name: string;
  pending: number;
  filed: number;
  disposed: number;
  allowanceRate: number;
  monthsToDisposition: number;
  averageOfficeActions: number;
}

export interface Stats {
  companies: number;
  averageAllowanceRate: string;
  averagePending: number;
  averageMonthsToDisposition: string;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface DashboardState {
  companies: Company[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: keyof Company;
  sortOrder: 'asc' | 'desc';
  selectedCompany: Company | null;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TableColumn {
  key: keyof Company;
  label: string;
  sortable: boolean;
  render?: (value: unknown, row: Company) => React.ReactNode;
}

export type SortOrder = 'asc' | 'desc';
export type SortField = keyof Company;
