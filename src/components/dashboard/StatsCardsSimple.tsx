'use client';

import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Building2Icon, 
  TrendingUpIcon, 
  DollarSignIcon, 
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';
import { Stats } from '@/types';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard = memo(({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  delay = 0 
}: StatCardProps) => (
  <div 
    className="animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Card className="group hover:shadow-strong transition-all duration-300 border-border/50 hover:border-primary-200 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary-100 group-hover:bg-primary-200 transition-colors">
          <Icon className="h-4 w-4 text-primary-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
            {trend && (
              <Badge 
                variant={trend.isPositive ? 'default' : 'error'}
                className="text-xs"
              >
                {trend.isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend.value)}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
));

StatCard.displayName = 'StatCard';

interface StatsCardsSimpleProps {
  stats?: Stats;
  loading?: boolean;
}

export const StatsCardsSimple = memo(({ stats, loading }: StatsCardsSimpleProps) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg p-6 h-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Companies',
      value: stats.companies.toLocaleString(),
      description: 'Companies in database',
      icon: Building2Icon,
      trend: { value: 12, isPositive: true },
      delay: 0
    },
    {
      title: 'Average Allowance Rate',
      value: stats.averageAllowanceRate,
      description: 'Patent allowance rate',
      icon: TrendingUpIcon,
      trend: { value: 5, isPositive: true },
      delay: 100
    },
    {
      title: 'Average Months to Disposition',
      value: stats.averageMonthsToDisposition,
      description: 'Time to patent disposition',
      icon: CalendarIcon,
      trend: { value: 8, isPositive: false },
      delay: 200
    },
    {
      title: 'Average Pending Patents',
      value: stats.averagePending.toLocaleString(),
      description: 'Pending patents per company',
      icon: DollarSignIcon,
      trend: { value: 15, isPositive: true },
      delay: 300
    }
  ];

  return (
    <div className="border border-border rounded-xl bg-card/50 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            delay={stat.delay}
          />
        ))}
      </div>
    </div>
  );
});

StatsCardsSimple.displayName = 'StatsCardsSimple';
