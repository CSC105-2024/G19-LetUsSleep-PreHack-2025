import type {Context} from "hono";
import {JobModel} from "../models/job.model.js";

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

export const JobController = {
    createJob : async (c: Context) => {
        try {
        const body = await c.req.json();
		if (!body) {
			return c.json({
				success: false,
				data: null,
				msg: 'Missing Required Field',
			});
		}
		const newJob = await JobModel.createJob(body);
		return c.json({
			success: true,
			data: newJob,
			msg: 'Successfully created new Job',
		});
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },
    getAllJob : async (c: Context) => {
        try {
		const Job = await JobModel.getAllJobs();
		return c.json({
			success: true,
			data: Job,
			msg: 'All job',
		});
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },

    getbyfil: async (c: Context) => {
    try {
        let body: JobFilters;
        
        // Check if body exists and has content
        const rawText = await c.req.text();
        if (!rawText || rawText.trim() === '') {
            return c.json({
                success: false,
                data: null,
                msg: 'Empty request body',
            });
        }
        
        try {
            body = JSON.parse(rawText);
        } catch (parseError) {
            return c.json({
                success: false,
                data: null,
                msg: 'Invalid JSON format',
            });
        }
        
        if (!body.jobTypes || !body.salaryRange) {
            return c.json({
                success: false,
                data: null,
                msg: 'Missing required fields: jobTypes or salaryRange',
            });
        }
        
        const Job = await JobModel.getJobByFilter(body);
        
        return c.json({
            success: true,
            data: Job,
            msg: 'filter use',
        });
    } catch (e) {
        console.error('Filter error:', e);
        return c.json(
            {
                success: false,
                data: null,
                msg: `Internal Server Error with filter: ${e}`,
            },
            500
        );
    }
},

     getJobbySearch: async (c: Context) => {
        try {
        const search = await c.req.param('search')
        if (!search) {
            return c.json({ error: "search is null" }, 404);
          }
          const getjob = await JobModel.getJobbysearch(search);
            return c.json({
                success: true,
                data: getjob,
                msg: "job by search",
            });
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },
    getJobbyID: async (c: Context) => {
        try {
        const id = await c.req.param('id')
        if (!id) {
            return c.json({ error: "ID job is null" }, 404);
          }
          const getjob = await JobModel.getJobById(Number(id));
            return c.json({
                success: true,
                data: getjob,
                msg: "job by id",
            });
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },
    EditJob: async (c:Context) =>{
        try {
        const id = await c.req.param('id')
        const body = await c.req.json();
        if (!id || !body ) {
            return c.json({ error: "missing data" }, 404);
        }
          const getjob = await JobModel.updateJob(Number(id),body);
            return c.json({
                success: true,
                data: getjob,
                msg: "Edit job",
            });
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },
    deleteJob: async (c:Context) =>{
        try {
        const id = await c.req.param('id')
        
        if (!id) {
            return c.json({ error: "missing data" }, 404);
        }
          const getjob = await JobModel.deleteJob(Number(id));
            return c.json({
                success: true,
                data: getjob,
                msg: "delete job",
            });
        } catch (e) {
        return c.json(
            {
            success: false,
            data: null,
            msg: `Internal Server Error : ${e}`,
            },
            500
        );
        }
    },
}