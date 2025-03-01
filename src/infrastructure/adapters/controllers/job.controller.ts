import { Controller, Get } from '@nestjs/common';
import { JobService } from '../../../application/services/job.service';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/job')
  getHello(): string {
    return this.jobService.getHello();
  }
}
