import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../../application/services/app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobService } from '../jobs/job.service';
import { JobProviderService } from '../http/job-provider/job-provider.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [AppController],
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [JobService, AppService, JobProviderService],
})
export class AppModule {}
