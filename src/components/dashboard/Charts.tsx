'use client';

import { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Company } from '@/types';
import { formatNumber } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

interface ChartsProps {
  companies: Company[];
  loading?: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AllowanceRateChart = memo(({ companies, loading }: ChartsProps) => {
  const data = useMemo(() => {
    return companies.map(company => ({
      name: company.name.split(',')[0], // Get first part of company name
      allowanceRate: company.allowanceRate * 100,
      pending: company.pending,
    }));
  }, [companies]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Allowance Rate by Company</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allowance Rate by Company</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Allowance Rate']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="allowanceRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

AllowanceRateChart.displayName = 'AllowanceRateChart';

const PendingApplicationsChart = memo(({ companies, loading }: ChartsProps) => {
  const data = useMemo(() => {
    return companies.map(company => ({
      name: company.name.split(',')[0],
      pending: company.pending,
      filed: company.filed,
      disposed: company.disposed,
    }));
  }, [companies]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [formatNumber(value), 'Applications']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            <Bar dataKey="filed" fill="#3b82f6" name="Filed" />
            <Bar dataKey="disposed" fill="#10b981" name="Disposed" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

PendingApplicationsChart.displayName = 'PendingApplicationsChart';

const DispositionTimeChart = memo(({ companies, loading }: ChartsProps) => {
  const data = useMemo(() => {
    return companies.map(company => ({
      name: company.name.split(',')[0],
      months: company.monthsToDisposition,
      officeActions: company.averageOfficeActions,
    }));
  }, [companies]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Disposition Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disposition Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}`, 'Months']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="months" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

DispositionTimeChart.displayName = 'DispositionTimeChart';

const CompanyDistributionChart = memo(({ companies, loading }: ChartsProps) => {
  const data = useMemo(() => {
    const totalPending = companies.reduce((sum, company) => sum + company.pending, 0);
    
    return companies.map((company, index) => ({
      name: company.name.split(',')[0],
      value: company.pending,
      percentage: ((company.pending / totalPending) * 100).toFixed(1),
      color: COLORS[index % COLORS.length],
    }));
  }, [companies]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Applications Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Applications Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatNumber(value), 'Pending Applications']}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

CompanyDistributionChart.displayName = 'CompanyDistributionChart';

export const Charts = memo(({ companies, loading }: ChartsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <AllowanceRateChart companies={companies} loading={loading} />
        <PendingApplicationsChart companies={companies} loading={loading} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DispositionTimeChart companies={companies} loading={loading} />
        <CompanyDistributionChart companies={companies} loading={loading} />
      </div>
    </div>
  );
});

Charts.displayName = 'Charts';
