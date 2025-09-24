'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  CodeIcon, 
  PaletteIcon, 
  ZapIcon, 
  ShieldCheckIcon,
  UserIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon
} from 'lucide-react';

export const Header = memo(() => {
  const t = useTranslations('header');
  
  const technologies = [
    { name: 'Next.js 15', icon: ZapIcon, color: 'bg-black text-white' },
    { name: 'TypeScript', icon: CodeIcon, color: 'bg-blue-600 text-white' },
    { name: 'Tailwind CSS', icon: PaletteIcon, color: 'bg-cyan-500 text-white' },
    { name: 'React 19', icon: ShieldCheckIcon, color: 'bg-blue-500 text-white' },
  ];

  return (
    <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white">
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">MVP</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {t('title')}
              </h1>
              <p className="text-primary-100 text-lg">
                {t('subtitle')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* MVP Info Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Author Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">{t('author')}</h3>
                  </div>
                  <p className="text-primary-100">
                    <span className="font-medium">{t('authorName')}</span>
                  </p>
                  <div className="flex gap-2">
                    <a 
                      href="https://github.com/Saitamx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                        <GithubIcon className="h-3 w-3 mr-1" />
                        GitHub
                      </Badge>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/saitamsw/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                        <LinkedinIcon className="h-3 w-3 mr-1" />
                        LinkedIn
                      </Badge>
                    </a>
                    <a 
                      href="https://www.instagram.com/ecoquerai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                        <InstagramIcon className="h-3 w-3 mr-1" />
                        Instagram
                      </Badge>
                    </a>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">{t('technologies')}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge 
                        key={tech.name}
                        className={`${tech.color} border-0`}
                      >
                        <tech.icon className="h-3 w-3 mr-1" />
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="h-5 w-5" />
                    <h3 className="font-semibold text-lg">{t('features')}</h3>
                  </div>
                  <div className="space-y-1 text-sm text-primary-100">
                    {t.raw('featuresList').map((feature: string, index: number) => (
                      <p key={index}>• {feature}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
