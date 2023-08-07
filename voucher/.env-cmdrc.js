const ports = {
  HTTP_PORT: 50052,
};

const typeorm = {
  TYPEORM_CONNECTION: 'postgres',
  TYPEORM_DATABASE: 'voucherdb',
  TYPEORM_USERNAME: 'postgres',
  TYPEORM_PASSWORD: 'postgres',
  TYPEORM_HOST: '127.0.0.1',
  TYPEORM_PORT: 54321,
  TYPEORM_SYNCHRONIZE: true,
  TYPEORM_ENTITIES: 'src/infrastructure/repositories/entities/**/*.ts',
  TYPEORM_ENTITIES_DIR: 'src/infrastructure/repositories/entities',
  TYPEORM_MIGRATIONS: 'src/infrastructure/repositories/migrations/**/*.ts',
  TYPEORM_MIGRATIONS_DIR: 'src/infrastructure/repositories/migrations',
  TYPEORM_MAX_QUERY_EXECUTION_TIME: 500,
};

const redis = {
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
};

module.exports = {
  defaults: {
    ...ports,
    ...typeorm,
    ...redis,
  },
  dev: {
    NODE_ENV: 'dev',
  },
  test: {
    NODE_ENV: 'test',
  },
  ci: {
    NODE_ENV: 'test',
    CI: true,
    LOG_LEVEL: 'INFO',
  },
};
