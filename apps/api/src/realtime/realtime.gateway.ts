import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private onlineUsers =
    new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(
      'Client connected:',
      client.id,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(
      'Client disconnected:',
      client.id,
    );

    this.onlineUsers.forEach(
      (socketId, userId) => {
        if (socketId === client.id) {
          this.onlineUsers.delete(
            userId,
          );
        }
      },
    );
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: string,

    @ConnectedSocket() client: Socket,
  ) {
    this.onlineUsers.set(
      userId,
      client.id,
    );

    return {
      connected: true,
    };
  }

  sendNotificationToUser(
    userId: string,
    notification: any,
  ) {
    const socketId =
      this.onlineUsers.get(userId);

    if (socketId) {
      this.server
        .to(socketId)
        .emit(
          'new_notification',
          notification,
        );
    }
  }
  @SubscribeMessage('join_chat')
handleJoinChat(
  @MessageBody() chatId: string,

  @ConnectedSocket() client: Socket,
) {
  client.join(chatId);

  return {
    joined: true,
  };
}

@SubscribeMessage('typing')
handleTyping(
  @MessageBody()
  data: {
    chatId: string;

    userId: string;
  },

  @ConnectedSocket() client: Socket,
) {
  client.to(data.chatId).emit(
    'typing',

    {
      userId: data.userId,
    },
  );
}

sendMessageToChat(
  chatId: string,

  message: any,
) {
  this.server
    .to(chatId)
    .emit(
      'new_message',
      message,
    );
}
}