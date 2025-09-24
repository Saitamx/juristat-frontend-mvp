import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, icon, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:scale-105 group';
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl hover:shadow-primary-500/25',
      secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-secondary-foreground hover:from-secondary-600 hover:to-secondary-700 shadow-lg hover:shadow-xl',
      outline: 'border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 text-foreground hover:shadow-lg',
      ghost: 'hover:bg-accent/20 hover:text-accent-foreground text-foreground hover:shadow-md',
      destructive: 'bg-gradient-to-r from-error-500 to-error-600 text-error-foreground hover:from-error-600 hover:to-error-700 shadow-lg hover:shadow-xl hover:shadow-error-500/25',
      accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-accent-foreground hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl hover:shadow-accent-500/25',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 py-2.5',
      lg: 'h-12 px-8 text-base',
      xl: 'h-14 px-10 text-lg',
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        suppressHydrationWarning
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && (
          <span className="group-hover:scale-110 transition-transform duration-200">
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };