'use client';

import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

export function DocumentCard({
  document,
}: {
  document: any;
}) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={
                document.visibility
              }
              size="small"
            />
          </Stack>

          <Stack spacing={1}>
            <Typography
              fontWeight={700}
            >
              {
                document.fileName
              }
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {
                document.description
              }
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Uploaded by:{' '}
            {
              document
                .uploadedBy
                ?.name
            }
          </Typography>

          {document.externalUrl && (
            <Button
              variant="outlined"
              href={
                document.externalUrl
              }
              target="_blank"
            >
              Open Link
            </Button>
          )}

          {document.fileUrl && (
            <Button
              variant="contained"
              href={
                document.fileUrl
              }
              target="_blank"
            >
              View File
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}