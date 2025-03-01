interface Location {
  city: string;
  state: string;
  remote: boolean;
}

interface Compensation {
  min: number;
  max: number;
  currency: string;
}

interface Employer {
  companyName: string;
  website: string;
}

interface Requirements {
  experience: number;
  technologies: string[];
}

interface Job {
  position: string;
  location: Location;
  compensation: Compensation;
  employer: Employer;
  requirements: Requirements;
  datePosted: string;
}

interface JobList {
  [jobId: string]: Job;
}

export interface Provider2JobResponse {
  status: string;
  data: {
    jobsList: JobList;
  };
}
