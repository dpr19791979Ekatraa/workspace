import { UserRole } from '@/types/auth';

export const rolePermissions = {
  dashboard: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'EMPLOYEE',
  ],

  tasks: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'EMPLOYEE',
  ],

  meetings: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'EMPLOYEE',
  ],

  performance: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
  ],

  policies: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
  ],

  reimbursements: [
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'EMPLOYEE',
  ],

  users: [
    'SUPER_ADMIN',
    'ADMIN',
  ],
};

export function hasPermission(
  role: UserRole,

  allowedRoles: UserRole[],
) {
  return allowedRoles.includes(
    role,
  );
}