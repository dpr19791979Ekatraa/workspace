'use client';

import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';

export function MeetingCard({
  meeting,
}: {
  meeting: any;
}) {
  return (
    <Card>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              icon={
                <VideocamRoundedIcon />
              }
              label={
                meeting.type ||
                'Meeting'
              }
              size="small"
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {new Date(
                meeting.startTime,
              ).toLocaleString()}
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
            >
              {meeting.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {meeting.description}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <AvatarGroup
              max={4}
            >
              {meeting
                .participants?.map(
                  (
                    participant: any,
                  ) => (
                    <Avatar
                      key={
                        participant.id
                      }
                    >
                      {
                        participant
                          .name?.[0]
                      }
                    </Avatar>
                  ),
                )}
            </AvatarGroup>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {
                meeting
                  .participants
                  ?.length
              }{' '}
              Participants
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}