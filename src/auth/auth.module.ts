import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '10d'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ]//Resta criar LocalStrategy e JwtStrategy
})

export class AuthModule implements NestModule{
  //Resta implementar LoginValidationMiddleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('login')
  }
}