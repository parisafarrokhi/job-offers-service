import { Schema, Document } from 'mongoose';

const JobCompensationSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  currency: { type: String, required: true },
});

const EmployerSchema = new Schema({
  companyName: { type: String, required: true },
  industry: { type: String },
  website: { type: String },
});

const JobSchema = new Schema({
  jobId: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String },
  remote: { type: Boolean },
  type: { type: String },
  compensation: { type: JobCompensationSchema, required: true },
  employer: { type: EmployerSchema, required: true },
  experience: { type: Number },
  skills: { type: [String], required: true },
  postedDate: { type: String, required: true },
});

export interface Job extends Document {
  jobId: string;
  title: string;
  location?: string;
  remote?: boolean;
  type?: string;
  compensation: {
    min: number;
    max: number;
    currency: string;
  };
  employer: {
    companyName: string;
    industry?: string;
    website?: string;
  };
  experience?: number;
  skills: string[];
  postedDate: string;
}

export const JobModel = JobSchema;
