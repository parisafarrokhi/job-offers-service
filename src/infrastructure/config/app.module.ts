import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JobProviderService } from '../http/job-provider/job-provider.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../adapters/controllers/app.controller';
import { JobCronService } from '../../application/services/job-cron.service';
import { JobService } from '../../application/services/job.service';
import { AppService } from '../../application/services/app.service';
import { JobController } from '../adapters/controllers/job.controller';

@Module({
  controllers: [AppController, JobController],
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
  ],
  providers: [JobService, JobCronService, AppService, JobProviderService, ConfigService],
})
export class AppModule {}
