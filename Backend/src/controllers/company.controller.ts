import type { Context } from "hono";
// import { db } from "../index.ts";
import {CompanyModel} from "../models/company.model.ts";


// create
export const createCompanyInfo = async (c: Context) => {
  try {
    const body = await c.req.json();
    if(!body){


    }
    const company = await CompanyModel.createCompanyInfo(body);
    return c.json({
      success: true,
      data: body,
      msg: "Success create Company information"
    });
  } catch (error) {
    throw new Error(`Failed to create company: ${error}`);
  }
};


// read
export const getCompanyById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const company = await CompanyModel.getCompanyById(id);
  if (!company)
    return c.json({
      error: "Company not found" }
      ,404
  );
  return c.json(company);
  } catch (error) {
    throw new Error(`Failed to get company by ID: ${error}`);
  }
};


// update
export const updateCompanyInfo = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();  
    const updated = await CompanyModel.updateCompanyInfo(id, data);
  return c.json(updated);
  } catch (error) {
    throw new Error(`Failed to update company: ${error}`);
  }
};


// delete
export const deleteCompany = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const deletedCompany = await CompanyModel.deleteCompany(id)
    return c.json({
      success: true,
      data: deleteCompany,
      msg: "Success delete Company information"
    });
  } catch (error) {
    throw new Error(`Failed to delete company: ${error}`);
  }
};



