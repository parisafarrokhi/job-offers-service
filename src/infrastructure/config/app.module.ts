import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../../application/services/app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobService } from '../jobs/job.service';
@Module({
  controllers: [AppController],
  imports: [ScheduleModule.forRoot()],
  providers: [JobService, AppService],
})
export class AppModule {}
