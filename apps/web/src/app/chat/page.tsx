'use client';

import {
  Box,
} from '@mui/material';

import {
  useState,
} from 'react';

import { AppShell } from '@/components/layout/app-shell';

import { ChatSidebar } from '@/components/chat/chat-sidebar';

import { ChatWindow } from '@/components/chat/chat-window';

import { useChats } from '@/hooks/use-chats';
import {
  Button,
} from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { StartChatModal } from '@/components/chat/start-chat-model';
import { PageHeader } from '@/components/shared/page-header';

export default function ChatPage() {
  const { data } =
    useChats();

  const [
    selectedChat,

    setSelectedChat,
  ] = useState(null);
  const [
  open,

  setOpen,
] = useState(false);

  return (
    <>
    <AppShell>
      <Box sx={{ mb: 3 }}>
        <PageHeader
          eyebrow="Communication"
          title="Team Chat"
          subtitle="Move from updates to decisions faster with a cleaner conversation workspace."
          action={
            <Button
              variant="contained"
              startIcon={
                <AddRoundedIcon />
              }
              onClick={() =>
                setOpen(true)
              }
            >
              New Chat
            </Button>
          }
        />
      </Box>

        <Box
  sx={{
    display: 'flex',
          height: {
            xs: '68vh',
            md: 'calc(100vh - 220px)',
          },
          borderRadius: 4,
          overflow: 'hidden',
          border: theme =>
            `1px solid ${theme.palette.divider}`,
          backgroundColor:
            'background.paper',
        }}
      >
        <ChatSidebar
          chats={data || []}
          selectedChat={
            selectedChat
          }
          onSelect={
            setSelectedChat
          }
        />

        {selectedChat ? (
  <ChatWindow
    chat={selectedChat}
  />
) : (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text.secondary',
      px: 2,
      textAlign: 'center',
    }}
  >
    Select a conversation
    to start chatting
  </Box>
)}
      </Box>
    </AppShell>
    <StartChatModal
  open={open}
  onClose={() =>
    setOpen(false)
  }
  onCreated={chat =>
    setSelectedChat(chat)
  }
/>
</>
  );
}