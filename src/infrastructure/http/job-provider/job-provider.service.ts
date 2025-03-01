import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JobProviderService {
  private readonly logger = new Logger(JobProviderService.name);

  constructor(private readonly httpService: HttpService) {}
  async getJobsFromAPI(jobUrl: string) {
    try {
      return [];
      // const response = await this.httpService.get(jobUrl);
      // return this.transformJobsData(response.data);
    } catch (error) {
      this.logger.error(`Failed to get jobs from ${jobUrl}: ${error.message}`);
      return [];
    }
  }

  private transformJobsData(rawData: any) {
    return [];
  }
}
