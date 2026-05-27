import { Injectable } from '@nestjs/common';

import { ClerkAuthGuard } from './guards/clerk-auth.guard';

@Injectable()
export class JwtAuthGuard extends ClerkAuthGuard {}