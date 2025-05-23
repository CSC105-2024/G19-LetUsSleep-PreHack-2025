import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const companyModel = {
    // Register a new company
    async register(companyData: { password: string; companyName: any; industry: any; companySize: any; location: any; phoneNumber: any; }) {
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
                password: hashedPassword,
            }
        });

        return {
            id: company.id,
            name: company.Name,
            industry: company.Industy,
            location: company.location
        };
    },

    // Login a company
    async login(name, password) {
        // Find the company by name (or you could use email if you add it to schema)
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
            { id: company.id, name: company.Name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            token,
            company: {
                id: company.id,
                name: company.Name,
                industry: company.Industy,
                location: company.location
            }
        };
    },

    // Get company by ID
    async getCompanyById(id) {
        const company = await prisma.company.findUnique({
            where: { id: parseInt(id) }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        return {
            id: company.id,
            name: company.Name,
            industry: company.Industy,
            size: company.CompanySize,
            location: company.location,
            phone: company.Telcontact,
            website: company.WebsiteURL
        };
    }
};