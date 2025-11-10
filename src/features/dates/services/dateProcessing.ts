/**
 * Calculate difference between two dates
 */
export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
} {
  const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

/**
 * Format date according to format string
 */
export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return format
    .replace(/YYYY/g, String(year))
    .replace(/YY/g, String(year).slice(-2))
    .replace(/MMMM/g, monthNames[date.getMonth()])
    .replace(/MMM/g, monthShortNames[date.getMonth()])
    .replace(/MM/g, month)
    .replace(/M/g, String(date.getMonth() + 1))
    .replace(/DDDD/g, dayNames[date.getDay()])
    .replace(/DDD/g, dayShortNames[date.getDay()])
    .replace(/DD/g, day)
    .replace(/D/g, String(date.getDate()))
    .replace(/HH/g, hours)
    .replace(/H/g, String(date.getHours()))
    .replace(/mm/g, minutes)
    .replace(/m/g, String(date.getMinutes()))
    .replace(/ss/g, seconds)
    .replace(/s/g, String(date.getSeconds()))
    .replace(/A/g, date.getHours() >= 12 ? 'PM' : 'AM')
    .replace(/a/g, date.getHours() >= 12 ? 'pm' : 'am');
}

/**
 * Convert Unix timestamp to Date
 */
export function timestampToDate(timestamp: number, isMilliseconds = true): Date {
  if (isMilliseconds) {
    return new Date(timestamp);
  }
  return new Date(timestamp * 1000);
}

/**
 * Convert Date to Unix timestamp
 */
export function dateToTimestamp(date: Date, asMilliseconds = true): number {
  if (asMilliseconds) {
    return date.getTime();
  }
  return Math.floor(date.getTime() / 1000);
}

/**
 * Get timezone offset string
 */
export function getTimezoneOffset(date: Date, timezone: string): string {
  if (timezone === 'UTC') {
    return '+00:00';
  }

  if (timezone === 'local') {
    const offset = -date.getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // For other timezones, we'd need a timezone library
  // For now, return local offset
  return getTimezoneOffset(date, 'local');
}

/**
 * Convert date to different timezone
 */
export function convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date {
  if (fromTimezone === toTimezone) {
    return date;
  }

  // For now, handle UTC and local
  if (fromTimezone === 'UTC' && toTimezone === 'local') {
    return new Date(date.toLocaleString());
  }

  if (fromTimezone === 'local' && toTimezone === 'UTC') {
    return new Date(date.toUTCString());
  }

  return date;
}

/**
 * Calculate age from birthdate
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
  };
}

/**
 * Get common date formats
 */
export function getCommonDateFormats(): Array<{ label: string; format: string; example: string }> {
  const now = new Date();
  return [
    { label: 'ISO 8601', format: 'YYYY-MM-DDTHH:mm:ss', example: formatDate(now, 'YYYY-MM-DDTHH:mm:ss') },
    { label: 'US Date', format: 'MM/DD/YYYY', example: formatDate(now, 'MM/DD/YYYY') },
    { label: 'European Date', format: 'DD/MM/YYYY', example: formatDate(now, 'DD/MM/YYYY') },
    { label: 'Long Date', format: 'MMMM DD, YYYY', example: formatDate(now, 'MMMM DD, YYYY') },
    { label: 'Short Date', format: 'MMM DD, YYYY', example: formatDate(now, 'MMM DD, YYYY') },
    { label: 'Date & Time', format: 'YYYY-MM-DD HH:mm:ss', example: formatDate(now, 'YYYY-MM-DD HH:mm:ss') },
    { label: 'Time Only', format: 'HH:mm:ss', example: formatDate(now, 'HH:mm:ss') },
    { label: '12 Hour', format: 'MM/DD/YYYY hh:mm A', example: formatDate(now, 'MM/DD/YYYY HH:mm A') },
    { label: 'Unix Timestamp', format: 'timestamp', example: String(now.getTime()) },
    { label: 'RFC 2822', format: 'DDD, DD MMM YYYY HH:mm:ss', example: formatDate(now, 'DDD, DD MMM YYYY HH:mm:ss') },
  ];
}

/**
 * Get common timezones
 */
export function getCommonTimezones(): Array<{ name: string; offset: string; abbreviation: string }> {
  return [
    { name: 'UTC', offset: '+00:00', abbreviation: 'UTC' },
    { name: 'Local', offset: 'local', abbreviation: 'Local' },
    { name: 'America/New_York', offset: '-05:00', abbreviation: 'EST' },
    { name: 'America/Chicago', offset: '-06:00', abbreviation: 'CST' },
    { name: 'America/Denver', offset: '-07:00', abbreviation: 'MST' },
    { name: 'America/Los_Angeles', offset: '-08:00', abbreviation: 'PST' },
    { name: 'Europe/London', offset: '+00:00', abbreviation: 'GMT' },
    { name: 'Europe/Paris', offset: '+01:00', abbreviation: 'CET' },
    { name: 'Asia/Tokyo', offset: '+09:00', abbreviation: 'JST' },
    { name: 'Asia/Shanghai', offset: '+08:00', abbreviation: 'CST' },
    { name: 'Asia/Dubai', offset: '+04:00', abbreviation: 'GST' },
    { name: 'Australia/Sydney', offset: '+10:00', abbreviation: 'AEDT' },
  ];
}

