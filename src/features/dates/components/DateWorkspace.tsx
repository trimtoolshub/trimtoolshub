import { useState, useRef } from 'react';
import {
  calculateDateDifference,
  formatDate,
  timestampToDate,
  dateToTimestamp,
  convertTimezone,
  calculateAge,
  getCommonDateFormats,
  getCommonTimezones,
} from '../services/dateProcessing';
import type { DateOperationType } from '../types';

export function DateWorkspace() {
  const [activeOperation, setActiveOperation] = useState<DateOperationType>('calculator');

  // Calculator state
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculateDateDifference> | null>(null);

  // Formatter state
  const [formatInputDate, setFormatInputDate] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('YYYY-MM-DD HH:mm:ss');
  const [formattedOutput, setFormattedOutput] = useState<string>('');

  // Timestamp state
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [timestampIsMs, setTimestampIsMs] = useState<boolean>(true);
  const [timestampDate, setTimestampDate] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');
  const [dateTimestamp, setDateTimestamp] = useState<string>('');
  const [dateTimestampIsMs, setDateTimestampIsMs] = useState<boolean>(true);

  // Timezone state
  const [timezoneInputDate, setTimezoneInputDate] = useState<string>('');
  const [fromTimezone, setFromTimezone] = useState<string>('local');
  const [toTimezone, setToTimezone] = useState<string>('UTC');
  const [timezoneResult, setTimezoneResult] = useState<string>('');

  // Age state
  const [birthDate, setBirthDate] = useState<string>('');
  const [ageResult, setAgeResult] = useState<ReturnType<typeof calculateAge> | null>(null);

  // Countdown state
  const [countdownTarget, setCountdownTarget] = useState<string>('');
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const [countdownRemaining, setCountdownRemaining] = useState<ReturnType<typeof calculateDateDifference> | null>(null);

  const countdownIntervalRef = useRef<number | null>(null);

  const handleCalculate = () => {
    if (!startDate || !endDate) return;

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return;
      }

      const result = calculateDateDifference(start, end);
      setCalculationResult(result);
    } catch (error) {
      console.error('Date calculation error:', error);
    }
  };

  const handleFormat = () => {
    if (!formatInputDate) return;

    try {
      const date = new Date(formatInputDate);
      if (isNaN(date.getTime())) {
        return;
      }

      if (selectedFormat === 'timestamp') {
        setFormattedOutput(String(date.getTime()));
      } else {
        setFormattedOutput(formatDate(date, selectedFormat));
      }
    } catch (error) {
      console.error('Date formatting error:', error);
    }
  };

  const handleTimestampToDate = () => {
    if (!timestampInput) return;

    try {
      const timestamp = parseFloat(timestampInput);
      if (isNaN(timestamp)) return;

      const date = timestampToDate(timestamp, timestampIsMs);
      setTimestampDate(date.toISOString().replace('T', ' ').slice(0, 19));
    } catch (error) {
      console.error('Timestamp conversion error:', error);
    }
  };

  const handleDateToTimestamp = () => {
    if (!dateInput) return;

    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return;

      const timestamp = dateToTimestamp(date, dateTimestampIsMs);
      setDateTimestamp(String(timestamp));
    } catch (error) {
      console.error('Date to timestamp error:', error);
    }
  };

  const handleTimezoneConvert = () => {
    if (!timezoneInputDate) return;

    try {
      const date = new Date(timezoneInputDate);
      if (isNaN(date.getTime())) return;

      const converted = convertTimezone(date, fromTimezone, toTimezone);
      setTimezoneResult(converted.toISOString().replace('T', ' ').slice(0, 19));
    } catch (error) {
      console.error('Timezone conversion error:', error);
    }
  };

  const handleCalculateAge = () => {
    if (!birthDate) return;

    try {
      const birth = new Date(birthDate);
      if (isNaN(birth.getTime())) return;

      const result = calculateAge(birth);
      setAgeResult(result);
    } catch (error) {
      console.error('Age calculation error:', error);
    }
  };

  const startCountdown = () => {
    if (!countdownTarget) return;

    try {
      const target = new Date(countdownTarget);
      if (isNaN(target.getTime())) return;

      setCountdownActive(true);

      const updateCountdown = () => {
        const now = new Date();
        if (target <= now) {
          setCountdownActive(false);
          setCountdownRemaining({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalDays: 0,
            totalHours: 0,
            totalMinutes: 0,
            totalSeconds: 0,
          });
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
          return;
        }

        const result = calculateDateDifference(now, target);
        setCountdownRemaining(result);
      };

      updateCountdown();
      countdownIntervalRef.current = window.setInterval(updateCountdown, 1000);
    } catch (error) {
      console.error('Countdown error:', error);
    }
  };

  const stopCountdown = () => {
    setCountdownActive(false);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const setCurrentDate = (field: 'start' | 'end' | 'format' | 'date' | 'timezone' | 'birth') => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16);

    switch (field) {
      case 'start':
        setStartDate(dateStr);
        break;
      case 'end':
        setEndDate(dateStr);
        break;
      case 'format':
        setFormatInputDate(dateStr);
        break;
      case 'date':
        setDateInput(dateStr);
        break;
      case 'timezone':
        setTimezoneInputDate(dateStr);
        break;
      case 'birth':
        setBirthDate(dateStr);
        break;
    }
  };

  const setCurrentTimestamp = () => {
    const now = new Date().getTime();
    setTimestampInput(String(now));
  };

  return (
    <div className="space-y-6">
      {/* Operation Selection */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Operation</label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {(
            [
              { value: 'calculator', label: 'Calculator' },
              { value: 'formatter', label: 'Formatter' },
              { value: 'timestamp', label: 'Timestamp' },
              { value: 'timezone', label: 'Timezone' },
              { value: 'age', label: 'Age' },
              { value: 'countdown', label: 'Countdown' },
            ] as Array<{ value: DateOperationType; label: string }>
          ).map((op) => (
            <button
              key={op.value}
              type="button"
              onClick={() => setActiveOperation(op.value)}
              className={[
                'rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition',
                activeOperation === op.value
                  ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                  : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
              ].join(' ')}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Calculator */}
      {activeOperation === 'calculator' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Date Calculator</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">Start Date</label>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentDate('start')}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                  >
                    Now
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">End Date</label>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentDate('end')}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                  >
                    Now
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!startDate || !endDate}
              className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Difference
            </button>
            {calculationResult && (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                <h4 className="mb-4 text-sm font-semibold text-white">Result</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-400">Days</p>
                    <p className="text-2xl font-semibold text-white">{calculationResult.days}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Hours</p>
                    <p className="text-2xl font-semibold text-white">{calculationResult.hours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Minutes</p>
                    <p className="text-2xl font-semibold text-white">{calculationResult.minutes}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Seconds</p>
                    <p className="text-2xl font-semibold text-white">{calculationResult.seconds}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 text-xs text-slate-300">
                  <p>Total Days: {calculationResult.totalDays.toLocaleString()}</p>
                  <p>Total Hours: {calculationResult.totalHours.toLocaleString()}</p>
                  <p>Total Minutes: {calculationResult.totalMinutes.toLocaleString()}</p>
                  <p>Total Seconds: {calculationResult.totalSeconds.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Date Formatter */}
      {activeOperation === 'formatter' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Date Formatter</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Input Date</label>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={formatInputDate}
                  onChange={(e) => setFormatInputDate(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                />
                <button
                  type="button"
                  onClick={() => setCurrentDate('format')}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  Now
                </button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
              >
                {getCommonDateFormats().map((fmt) => (
                  <option key={fmt.format} value={fmt.format}>
                    {fmt.label} - {fmt.example}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleFormat}
              disabled={!formatInputDate}
              className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Format Date
            </button>
            {formattedOutput && (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                <h4 className="mb-2 text-sm font-semibold text-white">Formatted Date</h4>
                <p className="font-mono text-lg text-white">{formattedOutput}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Unix Timestamp Converter */}
      {activeOperation === 'timestamp' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Timestamp to Date</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">Unix Timestamp</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={timestampInput}
                    onChange={(e) => setTimestampInput(e.target.value)}
                    placeholder="Enter timestamp"
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                  />
                  <button
                    type="button"
                    onClick={setCurrentTimestamp}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                  >
                    Now
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={timestampIsMs}
                  onChange={(e) => setTimestampIsMs(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
                />
                <span className="text-xs text-slate-300">Milliseconds (uncheck for seconds)</span>
              </label>
              <button
                type="button"
                onClick={handleTimestampToDate}
                disabled={!timestampInput}
                className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert to Date
              </button>
              {timestampDate && (
                <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                  <h4 className="mb-2 text-sm font-semibold text-white">Date</h4>
                  <p className="font-mono text-lg text-white">{timestampDate}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Date to Timestamp</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">Date</label>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentDate('date')}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                  >
                    Now
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={dateTimestampIsMs}
                  onChange={(e) => setDateTimestampIsMs(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
                />
                <span className="text-xs text-slate-300">Output as milliseconds (uncheck for seconds)</span>
              </label>
              <button
                type="button"
                onClick={handleDateToTimestamp}
                disabled={!dateInput}
                className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert to Timestamp
              </button>
              {dateTimestamp && (
                <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                  <h4 className="mb-2 text-sm font-semibold text-white">Timestamp</h4>
                  <p className="font-mono text-lg text-white">{dateTimestamp}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Timezone Converter */}
      {activeOperation === 'timezone' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Timezone Converter</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={timezoneInputDate}
                  onChange={(e) => setTimezoneInputDate(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                />
                <button
                  type="button"
                  onClick={() => setCurrentDate('timezone')}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  Now
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">From Timezone</label>
                <select
                  value={fromTimezone}
                  onChange={(e) => setFromTimezone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                >
                  {getCommonTimezones().map((tz) => (
                    <option key={tz.name} value={tz.name}>
                      {tz.name} ({tz.abbreviation})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">To Timezone</label>
                <select
                  value={toTimezone}
                  onChange={(e) => setToTimezone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                >
                  {getCommonTimezones().map((tz) => (
                    <option key={tz.name} value={tz.name}>
                      {tz.name} ({tz.abbreviation})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleTimezoneConvert}
              disabled={!timezoneInputDate}
              className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Convert Timezone
            </button>
            {timezoneResult && (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                <h4 className="mb-2 text-sm font-semibold text-white">Converted Date & Time</h4>
                <p className="font-mono text-lg text-white">{timezoneResult}</p>
                <p className="mt-2 text-xs text-slate-300">Timezone: {toTimezone}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Age Calculator */}
      {activeOperation === 'age' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Age Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Birth Date</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
                />
                <button
                  type="button"
                  onClick={() => setCurrentDate('birth')}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  Today
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCalculateAge}
              disabled={!birthDate}
              className="w-full rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Age
            </button>
            {ageResult && (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                <h4 className="mb-4 text-sm font-semibold text-white">Age</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-400">Years</p>
                    <p className="text-2xl font-semibold text-white">{ageResult.years}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Months</p>
                    <p className="text-2xl font-semibold text-white">{ageResult.months}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Days</p>
                    <p className="text-2xl font-semibold text-white">{ageResult.days}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Total Days</p>
                    <p className="text-2xl font-semibold text-white">{ageResult.totalDays.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Countdown Timer */}
      {activeOperation === 'countdown' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Countdown Timer</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Target Date & Time</label>
              <input
                type="datetime-local"
                value={countdownTarget}
                onChange={(e) => setCountdownTarget(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
              />
            </div>
            <div className="flex gap-3">
              {!countdownActive ? (
                <button
                  type="button"
                  onClick={startCountdown}
                  disabled={!countdownTarget}
                  className="flex-1 rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Countdown
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopCountdown}
                  className="flex-1 rounded-2xl border border-red-500/50 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                >
                  Stop Countdown
                </button>
              )}
            </div>
            {countdownRemaining && (
              <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6">
                <h4 className="mb-4 text-sm font-semibold text-white">Time Remaining</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-400">Days</p>
                    <p className="text-2xl font-semibold text-white">{countdownRemaining.days}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Hours</p>
                    <p className="text-2xl font-semibold text-white">{countdownRemaining.hours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Minutes</p>
                    <p className="text-2xl font-semibold text-white">{countdownRemaining.minutes}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Seconds</p>
                    <p className="text-2xl font-semibold text-white">{countdownRemaining.seconds}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

