import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JobService } from '../../../application/services/job.service';

@ApiTags('job-offers')
@Controller('api')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Get()
  getHello(): string {
    return this.jobService.getHello();
  }

  @Get('/job-offers')
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'location', required: false, example: 'San Francisco, CA' })
  @ApiQuery({ name: 'jobId', required: false, example: 'P1-250' })
  @ApiQuery({ name: 'title', required: false, example: 'Software Engineer' })
  @ApiQuery({ name: 'compensationMin', required: false, example: 91000 })
  @ApiQuery({ name: 'compensationMax', required: false, example: 136000 })
  @ApiQuery({ name: 'employerName', required: false, example: 'DataWorks' })
  @ApiQuery({ name: 'skills', required: false, example: 'Python,Machine Learning,SQL' })
  @ApiResponse({
    status: 200,
    example: [
      {
        "_id": "67c393d03a016be404f848e2",
        "jobId": "P1-250",
        "title": "Software Engineer",
        "location": "San Francisco, CA",
        "compensation": {
          "min": 91000,
          "max": 136000,
          "currency": "USD",
          "_id": "67c393d03a016be404f848e3"
        },
        "employer": {
          "companyName": "DataWorks",
          "industry": "Design",
          "_id": "67c393d03a016be404f848e4"
        },
        "skills": [
          "Python",
          "Machine Learning",
          "SQL"
        ],
        "postedDate": "2025-02-22T16:15:49.465Z",
        "__v": 0
      }
    ]
  })
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

    return await this.jobService.getOffers(page, limit, filters);
  }
}
