import { Injectable } from '@nestjs/common';
import { Job as JobInterface } from '../../infrastructure/database/models/job.schema';
import { JobRepository } from '../../infrastructure/database/repositories/job.repository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

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
  async getOffers(
    page: number = 1,
    limit: number = 10,
    filters: any = {},
  ): Promise<JobInterface[]> {
    const skip = (page - 1) * limit;
    const condition: any = {};

    if (filters.location) {
      condition.location = filters.location;
    }
    if (filters.jobId) {
      condition.jobId = filters.jobId;
    }
    if (filters.title) {
      condition.title = new RegExp(filters.title, 'i'); // Case-insensitive search
    }
    if (filters.compensationMin) {
      condition['compensation.min'] = { $gte: filters.compensationMin };
    }
    if (filters.compensationMax) {
      condition['compensation.max'] = { $lte: filters.compensationMax };
    }
    if (filters.employerName) {
      condition['employer.companyName'] = new RegExp(filters.employerName, 'i');
    }
    if (filters.skills && filters.skills.length > 0) {
      condition.skills = { $in: filters.skills };
    }

    return this.jobRepository.findByCondition(skip, limit, condition);
  }
}
