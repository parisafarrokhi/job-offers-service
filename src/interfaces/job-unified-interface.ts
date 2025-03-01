

interface Employer {
  companyName: string;
  industry?: string;
  website?: string;
}
interface JobCompensation {
  min: number;
  max: number;
  currency: string;
}

export interface UnifiedJobResponse {
  jobId: string;
  title: string;
  location?: string;
  remote?: boolean;
  type?: string;
  compensation: JobCompensation;
  employer: Employer;
  experience?: number;
  skills: string[];
  postedDate: string;
}
