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
    return this.jobModel.insertMany(jobDataArray);
  }

  async findAll(): Promise<JobInterface[]> {
    return this.jobModel.find().exec();
  }

  async findByJobId(jobId: string): Promise<JobInterface | null> {
    return this.jobModel.findOne({ jobId }).exec();
  }
}
