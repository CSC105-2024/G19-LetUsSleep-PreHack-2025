import { Hono } from "hono";
import * as companyController from "../controllers/company.controller.ts";


const companyRouter = new Hono();


companyRouter.post("/", companyController.createCompanyInfo);
companyRouter.get("/:id", companyController.getCompanyById);
companyRouter.patch("/:id", companyController.updateCompanyInfo);
companyRouter.delete("/:id", companyController.deleteCompany);


export { companyRouter };














