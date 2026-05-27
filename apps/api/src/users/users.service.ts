// import { Injectable, BadRequestException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

// import { PrismaService } from '../prisma/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(private prisma: PrismaService) {}

//   async createUser(dto: CreateUserDto) {
//     const existingUser = await this.prisma.user.findUnique({
//       where: {
//         email: dto.email,
//       },
//     });

//     if (existingUser) {
//       throw new BadRequestException('User already exists');
//     }

//     // IMPORTANT:
//     // Only one SUPER_ADMIN allowed
//     if (dto.role === 'SUPER_ADMIN') {
//       const existingSuperAdmin = await this.prisma.user.findFirst({
//         where: {
//           role: 'SUPER_ADMIN',
//         },
//       });

//       if (existingSuperAdmin) {
//         throw new BadRequestException(
//           'Only one Super Admin is allowed',
//         );
//       }
//     }

//     const hashedPassword = await bcrypt.hash(dto.password, 10);

//     return this.prisma.user.create({
//       data: {
//         name: dto.name,
//         email: dto.email,
//         password: hashedPassword,
//         role: dto.role || 'EMPLOYEE',
//       },
//     });
//   }

//   async findAllUsers() {
//     return this.prisma.user.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//   }
//   async updateUser(
//   id: string,
//   dto: any,
//   currentUser: any,
// ) {
//   const existingUser =
//     await this.prisma.user.findUnique({
//       where: { id },
//     });

//   if (!existingUser) {
//     throw new BadRequestException(
//       'User not found',
//     );
//   }

//   // ONLY SUPER ADMIN can promote/demote admins
//   if (
//     dto.role &&
//     dto.role !== existingUser.role
//   ) {
//     if (
//       currentUser.role !== 'SUPER_ADMIN'
//     ) {
//       throw new BadRequestException(
//         'Only Super Admin can change roles',
//       );
//     }

//     // Prevent removing last super admin
//     if (
//       existingUser.role === 'SUPER_ADMIN' &&
//       dto.role !== 'SUPER_ADMIN'
//     ) {
//       throw new BadRequestException(
//         'Super Admin cannot be demoted',
//       );
//     }

//     // Only one super admin allowed
//     if (dto.role === 'SUPER_ADMIN') {
//       throw new BadRequestException(
//         'Only one Super Admin allowed',
//       );
//     }
//   }

//   return this.prisma.user.update({
//     where: { id },
//     data: dto,
//   });
// }
// async findUserById(id: string) {
//   return this.prisma.user.findUnique({
//     where: { id },
//   });
// }
// }

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private async createUserEvents(
    userId: string,
    data: any,
  ) {
    const events: any[] = [];

    if (data.birthday) {
      events.push({
        title: 'Birthday',

        eventType: 'BIRTHDAY',

        eventDate: new Date(
          data.birthday,
        ),

        isRecurring: true,

        userId,
      });
    }

    if (data.marriageDate) {
      events.push({
        title: 'Marriage Anniversary',

        eventType:
          'MARRIAGE_ANNIVERSARY',

        eventDate: new Date(
          data.marriageDate,
        ),

        isRecurring: true,

        userId,
      });
    }

    if (data.joiningDate) {
      events.push({
        title: 'Work Anniversary',

        eventType:
          'WORK_ANNIVERSARY',

        eventDate: new Date(
          data.joiningDate,
        ),

        isRecurring: true,

        userId,
      });
    }

    if (events.length > 0) {
      await this.prisma.calendarEvent.createMany({
        data: events,
      });
    }
  }

  async createUser(
    dto: CreateUserDto,
  ) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'User already exists',
      );
    }

    // Only one super admin allowed
    if (dto.role === 'SUPER_ADMIN') {
      const existingSuperAdmin =
        await this.prisma.user.findFirst({
          where: {
            role: 'SUPER_ADMIN',
          },
        });

      if (existingSuperAdmin) {
        throw new BadRequestException(
          'Only one Super Admin is allowed',
        );
      }
    }

    const hashedPassword =
      await bcrypt.hash(
        dto.password,
        10,
      );

    const user =
      await this.prisma.user.create({
        data: {
          name: dto.name,

          email: dto.email,

          password: hashedPassword,

          role:
            dto.role || 'EMPLOYEE',

          birthday: dto.birthday
            ? new Date(dto.birthday)
            : null,

          marriageDate:
            dto.marriageDate
              ? new Date(
                  dto.marriageDate,
                )
              : null,

          joiningDate:
            dto.joiningDate
              ? new Date(
                  dto.joiningDate,
                )
              : null,
        },
      });

    await this.createUserEvents(
      user.id,
      dto,
    );

    return user;
  }

  async findAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateUser(
    id: string,
    dto: any,
    currentUser: any,
  ) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: { id },
      });

    if (!existingUser) {
      throw new BadRequestException(
        'User not found',
      );
    }
    if (
  currentUser.role ===
    'EMPLOYEE' &&
  currentUser.clerkUserId !==
    existingUser.clerkUserId
) {
  throw new BadRequestException(
    'You can only edit your own profile',
  );
}

    // Only Super Admin can change roles
    if (
      dto.role &&
      dto.role !== existingUser.role
    ) {
      if (
        currentUser.role !==
        'SUPER_ADMIN'
      ) {
        throw new BadRequestException(
          'Only Super Admin can change roles',
        );
      }

      // Prevent demoting super admin
      if (
        existingUser.role ===
          'SUPER_ADMIN' &&
        dto.role !== 'SUPER_ADMIN'
      ) {
        throw new BadRequestException(
          'Super Admin cannot be demoted',
        );
      }

      // Prevent creating another super admin
      if (
        dto.role === 'SUPER_ADMIN'
      ) {
        throw new BadRequestException(
          'Only one Super Admin allowed',
        );
      }
    }
    if (dto.birthday) {
  dto.birthday = new Date(
    dto.birthday,
  );
}

if (dto.marriageDate) {
  dto.marriageDate =
    new Date(
      dto.marriageDate,
    );
}

if (dto.joiningDate) {
  dto.joiningDate =
    new Date(
      dto.joiningDate,
    );
}

if (dto.childrenCount) {
  dto.childrenCount =
    Number(
      dto.childrenCount,
    );
}

    return this.prisma.user.update({
      where: { id },

      data: dto,
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}