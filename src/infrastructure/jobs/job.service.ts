import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobProviderService } from '../http/job-provider/job-provider.service';
import { ConfigService } from '@nestjs/config';
import { JobProvider } from '../../interfaces/job-provider.interface';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jobProvider: JobProviderService,
  ) {}

  private getJobOffersProviders(): JobProvider[] {
    return [
      {
        providerName: 'provider1',
        url: this.configService.get<string>('JOB_API_URL_1') ?? '',
      },
      {
        providerName: 'provider2',
        url: this.configService.get<string>('JOB_API_URL_2') ?? '',
      },
    ];
  }

  @Cron(process.env.CRON_JOB_INTERVAL || CronExpression.EVERY_10_SECONDS)
  async getJobOffersCron() {
    try {
      const jobOffersProviders = this.getJobOffersProviders();
      const unifiedJobs=  await this.jobProvider.getJobsFromAPI(jobOffersProviders);
    } catch (error) {
      this.logger.error(`Failed to get jobs : ${error.message}`);
    }
  }
}
