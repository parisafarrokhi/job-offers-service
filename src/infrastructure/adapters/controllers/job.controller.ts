import { Controller, Get } from '@nestjs/common';
import { JobService } from '../../../application/services/job.service';

@Controller('api')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  getHello(): string {
    return this.jobService.getHello();
  }
  @Get('/job-offers')
  list() {
    return this.jobService.getAllJobs();
  }
}
