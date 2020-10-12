import { Module } from '@nestjs/common';
import { Test } from './test.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
