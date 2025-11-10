export type DateOperationType = 'calculator' | 'formatter' | 'timestamp' | 'timezone' | 'age' | 'countdown';

export interface DateCalculationResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface DateFormatOption {
  label: string;
  format: string;
  example: string;
}

export interface TimezoneInfo {
  name: string;
  offset: string;
  abbreviation: string;
}

