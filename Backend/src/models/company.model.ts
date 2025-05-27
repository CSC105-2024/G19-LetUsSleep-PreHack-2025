import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const companyModel = {
    // Register a new company
    async register(companyData: {
        companyName: string;
        industry?: string;
        companySize?: string;
        location: string;
        phoneNumber?: string;
        email?: string;
        password: string;
    }) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(companyData.password, salt);

        // Create company in database
        const company = await prisma.company.create({
            data: {
                Name: companyData.companyName,
                Industy: companyData.industry,
                CompanySize: companyData.companySize,
                location: companyData.location,
                Telcontact: companyData.phoneNumber,
                Email: companyData.email, // Added email field
                password: hashedPassword,
            }
        });

        return {
            id: company.id,
            companyName: company.Name,
            industry: company.Industy,
            location: company.location,
            email: company.Email
        };
    },

    // Login a company - Updated to use email instead of name
    async login(email: string, password: string) {
        // Find the company by email (more standard than name)
        const company = await prisma.company.findFirst({
            where: {
                Email: email
            }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create and return JWT token
        const token = jwt.sign(
            { id: company.id, companyName: company.Name, email: company.Email, type: 'company' },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        return {
            token,
            company: {
                id: company.id,
                companyName: company.Name,
                industry: company.Industy,
                location: company.location,
                email: company.Email
            }
        };
    },

    // Alternative login by company name (keep for backward compatibility)
    async loginByName(name: string, password: string) {
        // Find the company by name
        const company = await prisma.company.findFirst({
            where: {
                Name: name
            }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create and return JWT token
        const token = jwt.sign(
            { id: company.id, companyName: company.Name, type: 'company' },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        return {
            token,
            company: {
                id: company.id,
                companyName: company.Name,
                industry: company.Industy,
                location: company.location,
                email: company.Email
            }
        };
    },

    // Get company by ID
    async getCompanyById(id: number) {
        const company = await prisma.company.findUnique({
            where: { id: parseInt(id.toString()) }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        return {
            id: company.id,
            companyName: company.Name,
            industry: company.Industy,
            companySize: company.CompanySize,
            location: company.location,
            phone: company.Telcontact,
            email: company.Email,
            website: company.WebsiteURL,
            overview: company.Overview,
            yearEstablished: company.YearEst
        };
    },

    // Update company profile
    async updateCompany(id: number, companyData: any) {
        const company = await prisma.company.update({
            where: { id: parseInt(id.toString()) },
            data: {
                Name: companyData.companyName,
                Overview: companyData.overview,
                Industy: companyData.industry,
                CompanySize: companyData.companySize,
                YearEst: companyData.yearEstablished ? parseInt(companyData.yearEstablished) : null,
                location: companyData.location,
                Telcontact: companyData.phoneNumber,
                Email: companyData.email,
                WebsiteURL: companyData.website,
            }
        });

        return {
            id: company.id,
            companyName: company.Name,
            industry: company.Industy,
            location: company.location,
            email: company.Email
        };
    }
};