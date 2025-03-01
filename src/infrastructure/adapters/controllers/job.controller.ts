import { Controller, Get, Query } from '@nestjs/common';
import { JobService } from '../../../application/services/job.service';

@Controller('api')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getHello(): string {
    return this.jobService.getHello();
  }

  @Get('/job-offers')
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('location') location?: string,
    @Query('jobId') jobId?: string,
    @Query('title') title?: string,
    @Query('compensationMin') compensationMin?: number,
    @Query('compensationMax') compensationMax?: number,
    @Query('employerName') employerName?: string,
    @Query('skills') skills?: string,
  ) {
    const filters = {
      location,
      jobId,
      title,
      compensationMin,
      compensationMax,
      employerName,
      skills: skills ? skills.split(',') : undefined,
    };

    const jobs = await this.jobService.getOffers(page, limit, filters);
    return jobs;
  }
}
