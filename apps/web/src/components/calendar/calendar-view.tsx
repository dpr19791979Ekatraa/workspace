'use client';

import { useMemo } from 'react';

import {
  Calendar,
  momentLocalizer,
} from 'react-big-calendar';

import moment from 'moment';

import { Box } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer =
  momentLocalizer(moment);

type CalendarEventItem = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  eventType?: string;
  isSpecialDay?: boolean;
  isSpecial?: boolean;
};

export function CalendarView({
  events,
}: {
  events: CalendarEventItem[];
}) {
  const specialDateSet =
    useMemo(() => {
      return new Set(
        events
          .filter(
            event =>
              Boolean(
                event.isSpecialDay ||
                  event.isSpecial ||
                  event.eventType,
              ),
          )
          .map(event =>
            moment(event.start).format(
              'YYYY-MM-DD',
            ),
          ),
      );
    }, [events]);

  return (
    <Box
      sx={{
        minHeight: 470,
        background: theme =>
          theme.palette.mode === 'dark'
            ? '#111111'
            : '#FFFFFF',
        p: 1.5,
        borderRadius: 3,
        border: theme =>
          `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        '& .rbc-toolbar': {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1.25,
        },
        '& .rbc-toolbar > *': {
          minWidth: 0,
        },
        '& .rbc-toolbar-label': {
          whiteSpace: 'normal',
          textAlign: 'center',
        },
        '& .rbc-btn-group': {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.75,
        },
        '& .rbc-btn-group button': {
          borderRadius: 999,
          padding: '6px 12px',
          fontSize: '0.78rem',
          borderColor: 'rgba(15, 23, 42, 0.15)',
        },
        '& .rbc-header': {
          fontSize: '0.8rem',
          padding: '8px 6px',
          color: 'text.secondary',
        },
        '& .rbc-date-cell': {
          padding: '6px 8px',
          textAlign: 'center',
        },
        '& .rbc-date-cell button, & .rbc-date-cell a': {
          width: 34,
          height: 34,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          fontSize: '0.84rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition:
            'background-color 160ms ease, color 160ms ease',
        },
        '& .rbc-off-range .rbc-date-cell button, & .rbc-off-range .rbc-date-cell a': {
          opacity: 0.45,
        },
        '& .rbc-today .rbc-date-cell button, & .rbc-today .rbc-date-cell a': {
          background: 'rgba(255,106,0,0.16)',
          color: '#D65A00',
        },
        '& .rbc-month-row': {
          minHeight: 62,
        },
        '& .rbc-day-bg + .rbc-day-bg': {
          borderLeftColor: 'rgba(148, 163, 184, 0.16)',
        },
        '& .rbc-row-content': {
          zIndex: 2,
        },
        '& .rbc-event': {
          whiteSpace: 'normal',
          borderRadius: 10,
          border: 'none',
          fontSize: '0.74rem',
          padding: '2px 6px',
          background: '#FF6A00',
        },
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        dayPropGetter={(
          date: Date,
        ) => {
          const isSpecial =
            specialDateSet.has(
              moment(date).format(
                'YYYY-MM-DD',
              ),
            );

          if (!isSpecial) {
            return {};
          }

          return {
            style: {
              backgroundColor:
                'rgba(255,106,0,0.06)',
              boxShadow:
                'inset 0 0 0 1px rgba(255,106,0,0.2)',
            },
          };
        }}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={['month', 'week', 'day']}
        style={{
          minHeight: 420,
          background: 'transparent',
        }}
      />
    </Box>
  );
}
