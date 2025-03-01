import { Injectable } from '@nestjs/common';
import { Job as JobInterface } from '../../infrastructure/database/models/job.schema';
import { JobRepository } from '../../infrastructure/database/repositories/job.repository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) { }

  getHello(): string {
    return 'Hello World Job!';
  }
  async createJob(jobData: JobInterface): Promise<JobInterface> {
    return this.jobRepository.create(jobData);
  }

  async createManyJobs(jobDataArray): Promise<JobInterface[]> {
    return this.jobRepository.createMany(jobDataArray);
  }

  async getAllJobs(): Promise<JobInterface[]> {
    return this.jobRepository.findAll();
  }

  async getJobById(jobId: string): Promise<JobInterface | null> {
    return this.jobRepository.findByJobId(jobId);
  }
}
