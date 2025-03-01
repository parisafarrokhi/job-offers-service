interface JobDetails {
  location: string;
  type: string;
  salaryRange: string;
}

interface JobCompany {
  name: string;
  industry: string;
}

interface Job {
  jobId: string;
  title: string;
  details: JobDetails;
  company: JobCompany;
  skills: string[];
  postedDate: string;
}

interface JobList {
  [jobId: string]: Job;
}

export interface Provider1JobResponse {
  metadata: {
    requestId: string;
    timestamp: string;
  };
  jobs: JobList;
}
