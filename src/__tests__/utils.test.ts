import { 
  formatNumber, 
  formatPercentage, 
  formatCurrency, 
  formatMonths,
  debounce,
  throttle 
} from '@/lib/utils';

describe('Utils', () => {
  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatPercentage', () => {
    it('should format numbers as percentages', () => {
      expect(formatPercentage(0.85)).toBe('85.0%');
      expect(formatPercentage(0.1234, 2)).toBe('12.34%');
      expect(formatPercentage(1)).toBe('100.0%');
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers as currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(1234567)).toBe('$1,234,567');
      expect(formatCurrency(0)).toBe('$0');
    });
  });

  describe('formatMonths', () => {
    it('should format numbers as months', () => {
      expect(formatMonths(25.5)).toBe('25.5 months');
      expect(formatMonths(30)).toBe('30.0 months');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 50);
    });
  });
});
