import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';

import { ProjectsModule } from './projects/projects.module';

import { TasksModule } from './tasks/tasks.module';
import { UploadsModule } from './uploads/uploads.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CalendarModule } from './calendar/calendar.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RealtimeGateway } from './realtime/realtime.gateway';
import { ChatModule } from './chat/chat.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { ReimbursementsModule } from './reimbursements/reimbursements.module';
import { DocumentsModule } from './documents/documents.module';
import { PoliciesModule } from './policies/policies.module';
import { PerformanceModule } from './performance/performance.module';
import { LeavesModule } from './leaves/leaves.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    UploadsModule,
    DashboardModule,
    CalendarModule,
    NotificationsModule,
    ChatModule,
    MeetingsModule,
    AnnouncementsModule,
    ReimbursementsModule,
    DocumentsModule,
    PoliciesModule,
    PerformanceModule,
    LeavesModule,
  ],

  controllers: [],

  providers: [RealtimeGateway],
})
export class AppModule {}