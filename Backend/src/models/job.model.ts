import { error } from "console";
import type { Job } from "../generated/prisma/index.js";
import { db } from "../index.ts";

type JobType = {
  id:number,            
  title: string,
  description?: string,
  responsibility?: string,
  qualification?: string,
  benefit?: string,
  workingHours?: string,
  jobType: string,
  minSalary: number,
  maxSalary: number,
  published: boolean,        
  companyId: number,
  categories: string      
}

type CreateJobInput = {
  title: string;
  companyId: number;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  categories: string;
  description?: string;
  responsibility?: string;
  qualification?: string;
  benefit?: string;
  workingHours?: string;
  published?: boolean;
}

type JobTypeFilter = {
  fullTime: boolean;
  partTime: boolean;
  internship: boolean;
  projectWork: boolean;
}

type SalaryRangeFilter = {
  min: number;
  max: number;
}

type JobFilters = {
  jobTypes: JobTypeFilter;
  salaryRange: SalaryRangeFilter;
  category: string;
}

export const JobModel = {

  createJob : async (jobData: CreateJobInput) => {
     try {
      const company = await db.company.findUnique({
      where: { id: jobData.companyId }
    });
    
    if (!company) {
      throw new Error(`Company with ID ${jobData.companyId} not found`);
    }
      const job = await db.job.create({
      data : {
        title : jobData.title,
        companyId: jobData.companyId,
        jobType: jobData.jobType,
        minSalary: jobData.minSalary,
        maxSalary: jobData.maxSalary,
        categories: jobData.categories,
        desciption: jobData.description,
        responbility: jobData.responsibility,
        qualification: jobData.qualification,
        benenfit: jobData.benefit,
        workingHours: jobData.workingHours,
        published: jobData.published
      }
    });
    return job;
    } 
    catch (error) {
      if (error === 'P2003') { // Foreign key constraint error
        throw new Error(
          "Invalid reference: One or more related records don't exist");
      }
      throw error;
    }
  },
  

  getAllJobs: async () => {
    return await db.job.findMany({
      where: { published: true }
    });
  },
  
  getJobById: async (id: number) => {
    const Job = await db.job.findUnique({
        where: {
            id: id,
        },
    });
    return Job;
  },

  getJobByFilter: async (filters:JobFilters) => {

    let jt = "";
    let el = "";
    if(filters.jobTypes.fullTime == true){
        jt = "Full-Time " + jt;
    }
    if(filters.jobTypes.partTime == true){
        jt = "Part-Time " + jt;
    }
    if(filters.jobTypes.internship == true){
        jt = "Internship " + jt;
    }
    if(filters.jobTypes.projectWork == true){
        jt = "ProjectWork " + jt;
    }
    
    const filjob = await db.job.findMany({ 
      where: { 
          published: true,
          jobType : {
            contains : jt,
          },
          categories : filters.category
        },
      }
    )
    let filsalary: Job[] = filjob.filter((job) => 
      job.maxSalary <= filters.salaryRange.max &&
      job.minSalary >= filters.salaryRange.min);

    return filsalary;  
  },

  getJobbysearch: async (searchTerm:string) => {
    if (searchTerm && searchTerm.trim() !== '') {
    return await db.job.findMany({ 
      where: { 
          published: true,
          title: {
            contains: searchTerm,
          }

        },
       }
    )}
  },

  updateJob: async (id: number, jobData:JobType) => {
    return await db.job.update({
      where: { id : id },
      data : {
        title : jobData.title,
        companyId: jobData.companyId,
        jobType: jobData.jobType,
        minSalary: jobData.minSalary,
        maxSalary: jobData.maxSalary,
        categories: jobData.categories,
        desciption: jobData.description,
        responbility: jobData.responsibility,
        qualification: jobData.qualification,
        benenfit: jobData.benefit,
        workingHours: jobData.workingHours,
        published: jobData.published
      }
    });
  },
  deleteJob: async (id: number) => {
      const job = await db.job.findUnique({
      where: { id: id }
      });
      if (!job) {
        throw new Error(`Company with ID ${id} not found`);
      }

      return await db.job.delete({
        where: { id:id }
      })
  },

};