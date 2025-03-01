import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobRepository } from './repositories/job.repository';
import { JobModel } from './models/job.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Job', schema: JobModel }])],
    providers: [JobRepository],
    exports: [JobRepository],
})
export class JobModule { }
