'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from '@mui/material';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const MONTH_LABELS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Accepts and emits YYYY-MM-DD strings; also tolerates full ISO datetime strings.
function normalise(val: string | null | undefined): string {
  if (!val) return '';
  return val.slice(0, 10);
}

function formatDisplay(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${String(d).padStart(2, '0')} ${MONTH_LABELS[m - 1]?.slice(0, 3)} ${y}`;
}

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

const THIS_YEAR = new Date().getFullYear();

const YEAR_LIST: number[] = [];
for (let y = THIS_YEAR - 100; y <= THIS_YEAR + 10; y++) {
  YEAR_LIST.push(y);
}

export function SmartDatePicker({
  label,
  value,
  onChange,
  fullWidth,
}: {
  label: string;
  value?: string | null;
  onChange: (val: string) => void;
  fullWidth?: boolean;
}) {
  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(null);
  const [mode, setMode] = useState<'day' | 'year'>('day');

  const normalised = normalise(value);
  const today = new Date();

  const parsedYear = normalised
    ? Number(normalised.split('-')[0])
    : today.getFullYear();
  const parsedMonth = normalised
    ? Number(normalised.split('-')[1]) - 1
    : today.getMonth();
  const parsedDay = normalised
    ? Number(normalised.split('-')[2])
    : null;

  const [viewYear, setViewYear] = useState(parsedYear);
  const [viewMonth, setViewMonth] = useState(parsedMonth);

  // Sync view when value resets (e.g. form reset with profile data)
  useEffect(() => {
    if (normalised) {
      setViewYear(Number(normalised.split('-')[0]));
      setViewMonth(Number(normalised.split('-')[1]) - 1);
    }
  }, [normalised]);

  // Build the day grid cells
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function handleOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
    setMode('day');
  }

  function handleClose() {
    setAnchorEl(null);
    setMode('day');
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleDayClick(day: number) {
    onChange(toISO(viewYear, viewMonth, day));
    handleClose();
  }

  function handleYearClick(y: number) {
    setViewYear(y);
    setMode('day');
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        label={label}
        value={formatDisplay(normalised)}
        onClick={handleOpen}
        fullWidth={fullWidth}
        placeholder="DD MMM YYYY"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayRoundedIcon
                  sx={{ fontSize: 16, color: 'text.secondary' }}
                />
              </InputAdornment>
            ),
            sx: { cursor: 'pointer' },
          },
          inputLabel: {
            shrink: !!normalised || undefined,
          },
        }}
        sx={{
          '& input': { cursor: 'pointer' },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              borderRadius: 3,
              p: 2,
              mt: 0.75,
              overflow: 'hidden',
            },
          },
        }}
      >
        {/* ── Header ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          {mode === 'day' && (
            <IconButton size="small" onClick={prevMonth}>
              <ChevronLeftRoundedIcon fontSize="small" />
            </IconButton>
          )}

          <Box
            onClick={() =>
              setMode((m) => (m === 'day' ? 'year' : 'day'))
            }
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.4,
              cursor: 'pointer',
              borderRadius: 2,
              py: 0.5,
              fontWeight: 700,
              fontSize: '0.88rem',
              userSelect: 'none',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            {mode === 'day'
              ? `${MONTH_LABELS[viewMonth]} ${viewYear}`
              : 'Select Year'}
            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 18,
                transform:
                  mode === 'year'
                    ? 'rotate(180deg)'
                    : 'none',
                transition: 'transform 200ms',
              }}
            />
          </Box>

          {mode === 'day' && (
            <IconButton size="small" onClick={nextMonth}>
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* ── Year grid ── */}
        {mode === 'year' ? (
          <Box
            sx={{
              height: 252,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0.4,
              pr: 0.5,
              /* auto-scroll to approx current year */
            }}
            ref={(el: HTMLDivElement | null) => {
              if (!el) return;
              // scroll selected year into view on open
              const idx = YEAR_LIST.indexOf(viewYear);
              if (idx >= 0) {
                const rowHeight = 40;
                el.scrollTop =
                  Math.floor(idx / 3) * rowHeight - 80;
              }
            }}
          >
            {YEAR_LIST.map((y) => {
              const isSelected = y === parsedYear && Boolean(normalised);
              const isCurrent = y === viewYear;
              return (
                <Box
                  key={y}
                  onClick={() => handleYearClick(y)}
                  sx={{
                    textAlign: 'center',
                    py: 0.85,
                    borderRadius: 2,
                    fontSize: '0.82rem',
                    fontWeight:
                      isSelected || isCurrent ? 700 : 400,
                    cursor: 'pointer',
                    bgcolor: isSelected
                      ? 'primary.main'
                      : isCurrent
                      ? 'action.selected'
                      : 'transparent',
                    color: isSelected
                      ? 'primary.contrastText'
                      : 'text.primary',
                    '&:hover': {
                      bgcolor: isSelected
                        ? 'primary.dark'
                        : 'action.hover',
                    },
                    transition: 'background-color 120ms',
                  }}
                >
                  {y}
                </Box>
              );
            })}
          </Box>
        ) : (
          /* ── Day grid ── */
          <>
            {/* Weekday headers */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                mb: 0.75,
              }}
            >
              {DAY_LABELS.map((d) => (
                <Typography
                  key={d}
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'text.secondary',
                    py: 0.4,
                  }}
                >
                  {d}
                </Typography>
              ))}
            </Box>

            {/* Day cells */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 0.3,
              }}
            >
              {cells.map((day, idx) => {
                if (!day) return <Box key={idx} />;

                const isSelected =
                  day === parsedDay &&
                  viewMonth === parsedMonth &&
                  viewYear === parsedYear &&
                  Boolean(normalised);

                const isToday =
                  day === today.getDate() &&
                  viewMonth === today.getMonth() &&
                  viewYear === today.getFullYear();

                return (
                  <Box
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    sx={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 400,
                      bgcolor: isSelected
                        ? 'primary.main'
                        : isToday
                        ? 'rgba(255,106,0,0.14)'
                        : 'transparent',
                      color: isSelected
                        ? 'primary.contrastText'
                        : isToday
                        ? 'primary.main'
                        : 'text.primary',
                      '&:hover': {
                        bgcolor: isSelected
                          ? 'primary.dark'
                          : 'action.hover',
                      },
                      transition: 'background-color 120ms',
                    }}
                  >
                    {day}
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Popover>
    </>
  );
}
