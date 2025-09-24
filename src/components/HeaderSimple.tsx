import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">MVP</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                Juristat Patent Analytics Dashboard
              </h1>
              <p className="text-primary-100 text-lg">
                MVP for Juristat technical test - Patent analysis dashboard
              </p>
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
                    <h3 className="font-semibold text-lg">Author</h3>
                  </div>
                  <p className="text-primary-100">
                    <span className="font-medium">Matías Troncoso</span>
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
                    <h3 className="font-semibold text-lg">Technologies</h3>
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
                    <h3 className="font-semibold text-lg">Features</h3>
                  </div>
                  <div className="space-y-1 text-sm text-primary-100">
                    <p>• Interactive and responsive dashboard</p>
                    <p>• Advanced filters and search</p>
                    <p>• Recharts visualizations</p>
                    <p>• Optimized Context API and hooks</p>
                    <p>• Jest and Cypress tests</p>
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
