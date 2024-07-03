import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule, DynamicModule } from '@nestjs/common';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens/supertokens.serive';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
