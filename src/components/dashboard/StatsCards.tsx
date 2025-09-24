'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Stats } from '@/types';
import { formatNumber } from '@/lib/utils';
import { 
  Building2Icon, 
  TrendingUpIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';

interface StatsCardsProps {
  stats: Stats | null;
  loading?: boolean;
}

export const StatsCards = memo(({ stats, loading }: StatsCardsProps) => {
  const t = useTranslations('stats');
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 bg-muted/50 rounded-lg w-3/4 shimmer"></div>
              <div className="h-10 w-10 bg-muted/50 rounded-xl shimmer"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted/50 rounded-lg w-1/2 mb-2 shimmer"></div>
              <div className="h-3 bg-muted/50 rounded w-2/3 shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No stats available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cards = [
    {
      title: t('totalCompanies'),
      value: formatNumber(stats.companies),
      description: t('activeOrganizations'),
      icon: Building2Icon,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: t('avgAllowanceRate'),
      value: stats.averageAllowanceRate,
      description: t('successRate'),
      icon: TrendingUpIcon,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-500/10 to-emerald-600/10',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      trend: '+5.2%',
      trendUp: true,
    },
    {
      title: t('avgPending'),
      value: formatNumber(stats.averagePending),
      description: t('applicationsInQueue'),
      icon: ClockIcon,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-500/10 to-amber-600/10',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
      trend: '-8.1%',
      trendUp: false,
    },
    {
      title: t('avgDispositionTime'),
      value: `${stats.averageMonthsToDisposition} ${t('months')}`,
      description: t('processingDuration'),
      icon: CheckCircleIcon,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-500/10 to-purple-600/10',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      trend: '-2.3%',
      trendUp: false,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div 
          key={card.title} 
          className="group relative overflow-hidden bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 animate-fade-in rounded-xl border"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {card.title}
            </CardTitle>
            <div className={`p-3 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform duration-200`}>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </div>
          </CardHeader>
          
          <CardContent className="relative">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-200">
                {card.value}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                card.trendUp 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {card.trendUp ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3" />
                )}
                {card.trend}
              </div>
            </div>
            <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
              {card.description}
            </p>
          </CardContent>
        </div>
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';