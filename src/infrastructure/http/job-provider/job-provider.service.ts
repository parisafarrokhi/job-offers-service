import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JobProvider } from '../../../interfaces/job-provider.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JobProviderService {
  private readonly logger = new Logger(JobProviderService.name);

  constructor(private readonly httpService: HttpService) {}
  async getJobsFromAPI(jobOffersProvider: JobProvider) {
    try {
      const response = await await lastValueFrom(this.httpService.get(jobOffersProvider.url));
      const data = response.data;

      return [];
      // return this.transformJobsData(response.data);
    } catch (error) {
      this.logger.error(`Failed to get jobs from ${jobOffersProvider.url}: ${error.message}`);
      return [];
    }
  }

  private transformJobsData(rawData: any) {
    return [];
  }
}
