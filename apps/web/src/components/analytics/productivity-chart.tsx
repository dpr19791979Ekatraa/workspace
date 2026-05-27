'use client';

import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function ProductivityChart({
  data,
}: {
  data: any[];
}) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          mb={2}
        >
          Productivity Overview
        </Typography>

        <div
          style={{
            width: '100%',
            height: 320,
          }}
        >
          <ResponsiveContainer>
            <BarChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}