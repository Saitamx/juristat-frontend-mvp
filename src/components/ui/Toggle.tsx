'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'success';
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    label, 
    checked = false, 
    onChange, 
    disabled = false, 
    size = 'md',
    variant = 'default',
    ...props 
  }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    const sizeClasses = {
      sm: 'w-8 h-4',
      md: 'w-11 h-6',
      lg: 'w-14 h-8',
    };

    const thumbSizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-5 h-5',
      lg: 'w-7 h-7',
    };

    const variantClasses = {
      default: isChecked ? 'bg-primary-500' : 'bg-muted',
      accent: isChecked ? 'bg-accent-500' : 'bg-muted',
      success: isChecked ? 'bg-success-500' : 'bg-muted',
    };

    return (
      <div className="flex items-center space-x-3">
        <button
          ref={ref}
          type="button"
          className={cn(
            'relative inline-flex items-center rounded-full border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
            sizeClasses[size],
            variantClasses[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'cursor-pointer hover:scale-105 active:scale-95'
          )}
          onClick={handleToggle}
          disabled={disabled}
          {...props}
        >
          <span
            className={cn(
              'inline-block rounded-full bg-white shadow-lg transform transition-all duration-200',
              thumbSizeClasses[size],
              isChecked ? 'translate-x-full' : 'translate-x-0'
            )}
          />
        </button>
        {label && (
          <label className="text-sm font-medium text-foreground cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };
