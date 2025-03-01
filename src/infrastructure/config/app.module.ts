import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../../application/services/app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobService } from '../jobs/job.service';
import { JobProviderService } from '../http/job-provider/job-provider.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  controllers: [AppController],
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JobService, AppService, JobProviderService, ConfigService],
})
export class AppModule {}
