import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
  } from '@nestjs/typeorm';
  
  export const configAsync: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
      return {
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: +process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        autoLoadEntities: true,
        retryAttempts: 3,
        migrations: [process.env.TYPEORM_MIGRATIONS],
        migrationsRun: true,
        synchronize: false,
        logging:false
      };
    },
  };