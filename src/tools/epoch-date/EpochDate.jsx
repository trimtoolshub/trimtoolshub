import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const EpochDate = () => {
  const [epochInput, setEpochInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [timezone, setTimezone] = useState('local')
  const [epochOutput, setEpochOutput] = useState('')
  const [dateOutput, setDateOutput] = useState('')
  const [error, setError] = useState('')

  const convertEpochToDate = () => {
    try {
      if (!epochInput.trim()) {
        setError('Please enter an epoch timestamp')
        return
      }

      let epoch = parseInt(epochInput)
      
      // Auto-detect if it's milliseconds or seconds
      if (epoch > 10000000000) {
        // Likely milliseconds
        epoch = epoch
      } else {
        // Likely seconds
        epoch = epoch * 1000
      }

      let date
      if (timezone === 'local') {
        date = dayjs(epoch)
      } else {
        date = dayjs(epoch).utc()
      }

      if (!date.isValid()) {
        setError('Invalid epoch timestamp')
        return
      }

      setDateOutput(date.format('YYYY-MM-DD HH:mm:ss'))
      setError('')
    } catch (err) {
      setError(`Error: ${err.message}`)
      setDateOutput('')
    }
  }

  const convertDateToEpoch = () => {
    try {
      if (!dateInput.trim()) {
        setError('Please enter a date')
        return
      }

      let date
      if (timezone === 'local') {
        date = dayjs(dateInput)
      } else {
        date = dayjs.utc(dateInput)
      }

      if (!date.isValid()) {
        setError('Invalid date format. Use YYYY-MM-DD HH:mm:ss')
        return
      }

      setEpochOutput(date.valueOf().toString())
      setError('')
    } catch (err) {
      setError(`Error: ${err.message}`)
      setEpochOutput('')
    }
  }

  const setCurrentTime = () => {
    const now = dayjs()
    setEpochInput(now.valueOf().toString())
    setDateInput(now.format('YYYY-MM-DD HH:mm:ss'))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Epoch ↔ Date Converter
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Time Zone:
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="timezone"
              value="local"
              checked={timezone === 'local'}
              onChange={(e) => setTimezone(e.target.value)}
            />
            Local Time
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <input
              type="radio"
              name="timezone"
              value="utc"
              checked={timezone === 'utc'}
              onChange={(e) => setTimezone(e.target.value)}
            />
            UTC
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={setCurrentTime}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Set Current Time
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Epoch Timestamp:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
              placeholder="1640995200000"
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}
            />
            <button
              onClick={convertEpochToDate}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              →
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            Date & Time:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="2022-01-01 00:00:00"
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                color: 'var(--text-primary)',
                fontFamily: 'monospace'
              }}
            />
            <button
              onClick={convertDateToEpoch}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)' }}>
              Epoch Output:
            </label>
            {epochOutput && (
              <button
                onClick={() => copyToClipboard(epochOutput)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Copy
              </button>
            )}
          </div>
          <div style={{
            padding: '0.75rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            color: 'var(--text-primary)',
            minHeight: '40px'
          }}>
            {epochOutput}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-secondary)' }}>
              Date Output:
            </label>
            {dateOutput && (
              <button
                onClick={() => copyToClipboard(dateOutput)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Copy
              </button>
            )}
          </div>
          <div style={{
            padding: '0.75rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            color: 'var(--text-primary)',
            minHeight: '40px'
          }}>
            {dateOutput}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
          About Epoch Timestamps:
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Unix epoch time is the number of seconds (or milliseconds) that have elapsed since January 1, 1970 UTC. 
          This tool auto-detects whether your input is in seconds or milliseconds format.
        </p>
      </div>
    </div>
  )
}

export default EpochDate

