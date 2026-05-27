'use client';

import {
  Avatar,
  Box,
  Stack,
  Typography,
} from '@mui/material';

export function ChatSidebar({
  chats,

  selectedChat,

  onSelect,
}: {
  chats: any[];

  selectedChat: any;

  onSelect: (
    chat: any,
  ) => void;
}) {
  return (
    <Box
      sx={{
        width: 320,

        borderRight:
          '1px solid rgba(255,255,255,0.08)',

        overflowY: 'auto',
      }}
    >
      <Stack>
        {chats.map(chat => {
          const otherUser =
            chat.members?.find(
              (m: any) =>
                !m.user
                  ?.email?.includes(
                    'your-email',
                  ),
            )?.user;

          return (
            <Box
              key={chat.id}
              onClick={() =>
                onSelect(chat)
              }
              sx={{
                p: 2,

                cursor: 'pointer',

                background:
                  selectedChat?.id ===
                  chat.id
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',

                borderBottom:
                  '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar>
                  {
                    otherUser?.name?.[0]
                  }
                </Avatar>

                <Stack
                  spacing={0.5}
                >
                  <Typography
                    fontWeight={600}
                  >
                    {
                      otherUser?.name
                    }
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {chat.messages?.[0]
                      ?.content ||
                      'No messages yet'}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}