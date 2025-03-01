import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobProviderService } from '../http/job-provider/job-provider.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(private readonly jobProvider: JobProviderService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.log('Running scheduled job every 10 seconds');
    const jobsFetchedByUrl = await this.jobProvider.getJobsFromAPI('');
    this.logger.log(jobsFetchedByUrl);
  }
}
