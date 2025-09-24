'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, min = 0, max = 100, step = 1, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onChange?.(newValue);
    };

    return (
      <div className="space-y-3">
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {value}
            </span>
          </div>
        )}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={cn(
              'w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider',
              className
            )}
            ref={ref}
            {...props}
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: linear-gradient(135deg, #0ea5e9, #0284c7);
              cursor: pointer;
              border: 2px solid #ffffff;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              transition: all 0.2s ease;
            }
            .slider::-webkit-slider-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
            }
            .slider::-moz-range-thumb {
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: linear-gradient(135deg, #0ea5e9, #0284c7);
              cursor: pointer;
              border: 2px solid #ffffff;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              transition: all 0.2s ease;
            }
            .slider::-moz-range-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
            }
          `}</style>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
