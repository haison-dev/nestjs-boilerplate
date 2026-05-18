type Environment = Record<string, string | undefined>;

export interface AppEnvironment {
  NODE_ENV: string;
  PORT: number;
  API_PREFIX: string;
  API_VERSION: string;
  DATABASE_ENABLED: boolean;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  QUEUE_ENABLED: boolean;
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;
  SENTRY_DSN?: string;
}

const toBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
};

const toNumber = (
  value: string | undefined,
  fallback: number,
  key: string,
): number => {
  if (value === undefined || value === '') {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${key} must be a valid number`);
  }

  return parsed;
};

export const validateEnvironment = (config: Environment): AppEnvironment => ({
  NODE_ENV: config.NODE_ENV ?? 'development',
  PORT: toNumber(config.PORT, 3000, 'PORT'),
  API_PREFIX: config.API_PREFIX ?? 'api',
  API_VERSION: config.API_VERSION ?? '1',
  DATABASE_ENABLED: toBoolean(config.DATABASE_ENABLED, false),
  DATABASE_HOST: config.DATABASE_HOST ?? 'localhost',
  DATABASE_PORT: toNumber(config.DATABASE_PORT, 5432, 'DATABASE_PORT'),
  DATABASE_USER: config.DATABASE_USER ?? 'postgres',
  DATABASE_PASSWORD: config.DATABASE_PASSWORD ?? 'postgres',
  DATABASE_NAME: config.DATABASE_NAME ?? 'e_commerce',
  REDIS_HOST: config.REDIS_HOST ?? 'localhost',
  REDIS_PORT: toNumber(config.REDIS_PORT, 6379, 'REDIS_PORT'),
  QUEUE_ENABLED: toBoolean(config.QUEUE_ENABLED, false),
  THROTTLE_TTL: toNumber(config.THROTTLE_TTL, 60000, 'THROTTLE_TTL'),
  THROTTLE_LIMIT: toNumber(config.THROTTLE_LIMIT, 100, 'THROTTLE_LIMIT'),
  SENTRY_DSN: config.SENTRY_DSN,
});
