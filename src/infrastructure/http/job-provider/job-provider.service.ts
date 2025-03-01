import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JobProvider } from '../../../interfaces/job-provider.interface';
import { lastValueFrom } from 'rxjs';
import { Provider1JobResponse } from '../../../interfaces/job-provider1-response.interface';
import { Provider2JobResponse } from '../../../interfaces/job-provider2-response.interface';
import { UnifiedJobResponse } from '../../../interfaces/job-unified-interface';

@Injectable()
export class JobProviderService {
  private readonly logger = new Logger(JobProviderService.name);

  constructor(private readonly httpService: HttpService) {}
  async getJobsFromAPI(jobOffersProviders: JobProvider[]): Promise<UnifiedJobResponse[]> {
    try {
      const unifiedJobs: UnifiedJobResponse[] = [];
      for (const jobOffersProvider of jobOffersProviders) {
        const response = await await lastValueFrom(this.httpService.get(jobOffersProvider.url));
        const data = response.data;
        const transformedResponse = this.tranformJobOfferData(jobOffersProvider.providerName, data);
        unifiedJobs.push(...transformedResponse);
      }
      return unifiedJobs;
    } catch (error) {
      this.logger.error(`Failed to get jobs: ${error.message}`);
      return [];
    }
  }

  private tranformJobOfferData(
    providerName: string,
    data: Provider1JobResponse | Provider2JobResponse,
  ): UnifiedJobResponse[] {
    switch (providerName) {
      case 'provider1':
        return this.transformProvider1Jobs(data as Provider1JobResponse);
      case 'provider2':
        return this.transformProvider2Jobs(data as Provider2JobResponse);
      default:
        this.logger.error(`Unsupported provider: ${providerName}`);
        return [];
    }
  }

  private transformProvider1Jobs(data: Provider1JobResponse): UnifiedJobResponse[] {
    const convertSalaryRange = (salaryRange: string) => {
      let cleanSalaryRange = salaryRange
        .replace(/\$/g, '')
        .replace(/\s+/g, '')
        .replace(/k/g, '000');
      const [minSalary, maxSalary] = cleanSalaryRange.split('-').map(Number);
      return {
        min: +minSalary,
        max: +maxSalary,
        currency: 'USD',
      };
    };
    return Object.keys(data.jobs).map((jobId) => {
      const job = data.jobs[jobId];
      return {
        jobId: job.jobId,
        title: job.title,
        location: job.details?.location,
        compensation: convertSalaryRange(job.details?.salaryRange),
        employer: {
          companyName: job.company.name,
          industry: job.company.industry,
        },
        skills: job.skills,
        postedDate: job.postedDate,
      };
    });
  }

  private transformProvider2Jobs(data: Provider2JobResponse): UnifiedJobResponse[] {
    return Object.keys(data.data.jobsList).map((jobId) => {
      const job = data.data.jobsList[jobId];
      return {
        jobId: jobId,
        title: job.position,
        location: `${job.location.city}, ${job.location.state}`,
        remote: job.location.remote,
        compensation: job.compensation,
        employer: {
          companyName: job.employer.companyName,
          website: job.employer.website,
        },
        experience: job.requirements.experience,
        skills: job.requirements.technologies,
        postedDate: job.datePosted,
      };
    });
  }
}
