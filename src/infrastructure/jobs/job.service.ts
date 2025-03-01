import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobProviderService } from '../http/job-provider/job-provider.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jobProvider: JobProviderService,
  ) {}

  @Cron(process.env.CRON_JOB_INTERVAL || CronExpression.EVERY_10_SECONDS)
  async getJobOffersCron() {
    const jobsFetchedByUrl = await this.jobProvider.getJobsFromAPI('');
    this.logger.log(jobsFetchedByUrl);
  }
}
