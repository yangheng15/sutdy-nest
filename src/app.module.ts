import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Test } from './modules/test/test.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { DemoMiddleware } from './demo/middleware/demo.middleware';
import { PostController } from './demo/post/post.controller';
import { PostService } from './demo/service/post.service';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TestModule,
  ],
  controllers: [AppController, CatsController, PostController],
  providers: [AppService, PostService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware).forRoutes('post') //post路由中间件
  }
}
