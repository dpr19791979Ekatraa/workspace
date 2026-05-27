'use client';

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  useEffect,
  useState,
} from 'react';

import { socket } from '@/lib/socket';

import { useSendMessage } from '@/hooks/use-send-message';

export function ChatWindow({
  chat,
}: {
  chat: any;
}) {
  const [messages, setMessages] =
    useState(
      chat?.messages || [],
    );

  const [content, setContent] =
    useState('');

  const sendMutation =
    useSendMessage();

  useEffect(() => {
    socket.on(
      'new-message',
      message => {
        if (
          message.chatId ===
          chat.id
        ) {
          setMessages(prev => [
            ...prev,
            message,
          ]);
        }
      },
    );

    return () => {
      socket.off(
        'new-message',
      );
    };
  }, [chat]);

  async function handleSend() {
    if (!content.trim())
      return;

    await sendMutation.mutateAsync(
      {
        chatId: chat.id,

        content,
      },
    );

    setContent('');
  }

  return (
    <Stack
      flex={1}
      height="100%"
    >
      <Box
        sx={{
          flex: 1,

          overflowY: 'auto',

          p: 3,
        }}
      >
        <Stack spacing={2}>
          {messages.map(
            (message: any) => (
              <Box
                key={message.id}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {
                    message.sender
                      ?.name
                  }
                </Typography>

                <Typography>
                  {
                    message.content
                  }
                </Typography>
              </Box>
            ),
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          p: 2,

          borderTop:
            '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            value={content}
            onChange={e =>
              setContent(
                e.target.value,
              )
            }
            placeholder="Type a message..."
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSend}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}