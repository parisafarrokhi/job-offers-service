import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job as JobInterface } from '../../database/models/job.schema';

@Injectable()
export class JobRepository {
  constructor(@InjectModel('Job') private readonly jobModel: Model<JobInterface>) {}

  async create(jobData: JobInterface): Promise<JobInterface> {
    const createdJob = new this.jobModel(jobData);
    return createdJob.save();
  }

  async createMany(jobDataArray: JobInterface[]): Promise<JobInterface[]> {
    const jobIdsArray = jobDataArray.map(job => job.jobId);
    const duplicateJobs = await this.jobModel
      .find({ jobId: { $in: jobIdsArray } })
      .exec();
    const duplicateJobIds = new Set(duplicateJobs.map(job => job.jobId));
    const newJobs = jobDataArray.filter(job => !duplicateJobIds.has(job.jobId));
    if (newJobs.length > 0) {
      return this.jobModel.insertMany(newJobs);
    }
    return [];
  }

  async findAll(): Promise<JobInterface[]> {
    return this.jobModel.find().exec();
  }

  async findByJobId(jobId: string): Promise<JobInterface | null> {
    return this.jobModel.findOne({ jobId }).exec();
  }

  async findByCondition(skip, limit, condition): Promise<JobInterface[]> {
    return this.jobModel.find(condition).skip(skip).limit(limit).exec();
  }
}
