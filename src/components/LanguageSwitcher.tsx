'use client';

import { memo } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import { GlobeIcon } from 'lucide-react';

export const LanguageSwitcher = memo(() => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <GlobeIcon className="h-4 w-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border/50 overflow-hidden">
        <Button
          variant={locale === 'en' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('en')}
          className="rounded-none border-0 h-8 px-3 text-xs"
        >
          EN
        </Button>
        <Button
          variant={locale === 'es' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('es')}
          className="rounded-none border-0 h-8 px-3 text-xs"
        >
          ES
        </Button>
      </div>
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
