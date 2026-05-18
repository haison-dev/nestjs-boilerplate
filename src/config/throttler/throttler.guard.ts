import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: FastifyRequest): Promise<string> {
    const proxyIp =
      req?.headers['X-Forwarded'] ??
      req?.headers['x-forwarded'] ??
      req?.headers['X-Forwarded-For'] ??
      req?.headers['x-forwarded-for'] ??
      req?.headers?.['X-Real-IP'] ??
      req?.headers?.['x-real-ip'];

    return (proxyIp ?? req?.ips?.length) ? req?.ips[0] : req?.ip;
  }
}
