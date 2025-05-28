import { error } from "console";
import type { Job } from "../generated/prisma/index.js";
import { db } from "../index.ts";
type JobType = {
  id: number,
  title: string,
  Desciption?: string,      // capital D, matches schema
  Responbility?: string,    // capital R, matches schema
  Qualification?: string,   // capital Q, matches schema
  Benenfit?: string,        // capital B, matches schema
  workingHours?: string,
  location?: string,
  JobType: string,          // capital J, matches schema
  minSalary: number,
  maxSalary: number,
  published: boolean,
  CompanyId: number,        // capital C, matches schema
  categ
}

type CreateJobInput = {
  title: string,
  Desciption?: string,
  Responbility?: string,
  Qualification?: string,
  Benenfit?: string,
  workingHours?: string,
  location?: string,
  JobType: string,
  minSalary: number,
  maxSalary: number,
  published?: boolean,
  CompanyId: number,
  // categories: string
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
    console.log("Job Data:", jobData);
     try {
      const company = await db.company.findUnique({
      where: { id: jobData.CompanyId }
    });
    
    if (!company) {
      throw new Error(`Company with ID ${jobData.CompanyId} not found`);
    }
 const job = await db.job.create({
        data: {
          title: jobData.title,
          Desciption: jobData.Desciption,
          Responbility: jobData.Responbility,
          Qualification: jobData.Qualification,
          Benenfit: jobData.Benenfit,
          workingHours: jobData.workingHours,
          location: jobData.location,
          JobType: jobData.JobType,
          minSalary: jobData.minSalary,
          maxSalary: jobData.maxSalary,
          published: jobData.published,
          CompanyId: jobData.CompanyId,
          // categories: jobData.categories,
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

updateJob: async (id: number, jobData: any) => {
    return await db.job.update({
      where: { id: id },
      data: {
        title: jobData.title,
        Desciption: jobData.Desciption,
        Responbility: jobData.Responbility,
        Qualification: jobData.Qualification,
        Benenfit: jobData.Benenfit,
        workingHours: jobData.workingHours,
        location: jobData.location,
        JobType: jobData.JobType,
        minSalary: jobData.minSalary,
        maxSalary: jobData.maxSalary,
        published: jobData.published,
        CompanyId: jobData.CompanyId,
        // categories: jobData.categories,
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