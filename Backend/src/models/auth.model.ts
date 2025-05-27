import { db } from '../index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userModel = {
    // Register a new user
    async register(userData: {
        identificationNumber?: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber?: string;
        password: string;
        dateOfBirth?: string;
        hasExperience?: boolean;
        jobTitle?: string;
        companyName?: string;
        startYear?: string;
        startMonth?: string;
        endYear?: string;
        endMonth?: string;
        stillInRole?: boolean;
        resumeUrl?: string;
    }) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Calculate age if dateOfBirth is provided
        let age: number | null = null;
        if (userData.dateOfBirth) {
            const birthDate = new Date(userData.dateOfBirth);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }

        // Create user in database
        const user = await db.user.create({
            data: {
                identificationNumber: userData.identificationNumber || null,
                firstName: userData.firstName,
                lastName: userData.lastName,
                Email: userData.email || null,
                Telphone: userData.phoneNumber || null,
                password: hashedPassword,
                Bdate: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
                age: age,
                hasExperience: userData.hasExperience || false,
                jobTitle: userData.jobTitle || null,
                companyName: userData.companyName || null,
                startYear: userData.startYear || null,
                startMonth: userData.startMonth || null,
                endYear: userData.endYear || null,
                endMonth: userData.endMonth || null,
                stillInRole: userData.stillInRole || false,
                ResumeURL: userData.resumeUrl || null,
            }
        });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.Email || '' // Handle null case
        };
    },

    // Get user by email
    async getUserByEmail(email: string) {
        const user = await db.user.findFirst({
            where: {
                Email: email
            }
        });
        return user;
    },

    // Login a user
    async login(email: string, password: string) {
        // Find the user
        const user = await db.user.findFirst({
            where: {
                Email: email
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create and return JWT token
        const token = jwt.sign(
            { id: user.id, email: user.Email || '', type: 'user' },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.Email || '' // Handle null case
            }
        };
    },

    // Get user by ID
    async getUserById(id: number) {
        const user = await db.user.findUnique({
            where: { id: parseInt(id.toString()) }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            identificationNumber: user.identificationNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.Email || '', // Handle null case
            phone: user.Telphone,
            dateOfBirth: user.Bdate,
            age: user.age,
            hasExperience: user.hasExperience,
            jobTitle: user.jobTitle,
            companyName: user.companyName,
            startYear: user.startYear,
            startMonth: user.startMonth,
            endYear: user.endYear,
            endMonth: user.endMonth,
            stillInRole: user.stillInRole,
            resumeUrl: user.ResumeURL
        };
    },

    // Update user profile
    async updateUser(id: number, userData: any) {
        // Calculate age if dateOfBirth is provided
        let age: number | null = null;
        if (userData.dateOfBirth) {
            const birthDate = new Date(userData.dateOfBirth);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }

        // Hash password if provided
        let hashedPassword: string | undefined = undefined;
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(userData.password, salt);
        }

        // Build update data object - only include fields that are provided
        const updateData: any = {};

        if (userData.identificationNumber !== undefined) updateData.identificationNumber = userData.identificationNumber;
        if (userData.firstName !== undefined) updateData.firstName = userData.firstName;
        if (userData.lastName !== undefined) updateData.lastName = userData.lastName;
        if (userData.email !== undefined) updateData.Email = userData.email;
        if (userData.phoneNumber !== undefined) updateData.Telphone = userData.phoneNumber;
        if (hashedPassword) updateData.password = hashedPassword;
        if (userData.dateOfBirth !== undefined) updateData.Bdate = userData.dateOfBirth ? new Date(userData.dateOfBirth) : null;
        if (age !== null) updateData.age = age;
        if (userData.hasExperience !== undefined) updateData.hasExperience = userData.hasExperience;
        if (userData.jobTitle !== undefined) updateData.jobTitle = userData.jobTitle;
        if (userData.companyName !== undefined) updateData.companyName = userData.companyName;
        if (userData.startYear !== undefined) updateData.startYear = userData.startYear;
        if (userData.startMonth !== undefined) updateData.startMonth = userData.startMonth;
        if (userData.endYear !== undefined) updateData.endYear = userData.endYear;
        if (userData.endMonth !== undefined) updateData.endMonth = userData.endMonth;
        if (userData.stillInRole !== undefined) updateData.stillInRole = userData.stillInRole;
        if (userData.resumeUrl !== undefined) updateData.ResumeURL = userData.resumeUrl;

        const user = await db.user.update({
            where: { id: parseInt(id.toString()) },
            data: updateData
        });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.Email || '' // Handle null case
        };
    }
};

// Company Model
export const companyModel = {
    // Register a new company
    async register(companyData: {
        companyName: string;
        industry?: string;
        companySize?: string;
        location: string;
        phoneNumber?: string;
        email: string;
        password: string;
        overview?: string;
        yearEst?: number;
        generalBe?: string;
        websiteUrl?: string;
    }) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(companyData.password, salt);

        // Create company in database - using correct field names from schema
        const company = await db.company.create({
            data: {
                Name: companyData.companyName,
                Overview: companyData.overview || null,
                Industry: companyData.industry || null,
                CompanySize: companyData.companySize || null,
                YearEst: companyData.yearEst || null,
                GeneralBe: companyData.generalBe || null,
                location: companyData.location,
                Telcontact: companyData.phoneNumber || null,
                Email: companyData.email || null,
                WebsiteURL: companyData.websiteUrl || null,
                password: hashedPassword,
            }
        });

        return {
            id: company.id,
            companyName: company.Name,
            location: company.location,
            email: company.Email || '' // Handle null case
        };
    },

    // Get company by email
    async getCompanyByEmail(email: string) {
        const company = await db.company.findFirst({
            where: {
                Email: email
            }
        });
        return company;
    },

    // Login a company
    async login(email: string, password: string) {
        // Find the company
        const company = await db.company.findFirst({
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
            { id: company.id, email: company.Email || '', type: 'company' },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        return {
            token,
            company: {
                id: company.id,
                companyName: company.Name,
                location: company.location,
                email: company.Email || '' // Handle null case
            }
        };
    },

    // Get company by ID
    async getCompanyById(id: number) {
        const company = await db.company.findUnique({
            where: { id: parseInt(id.toString()) }
        });

        if (!company) {
            throw new Error('Company not found');
        }

        return {
            id: company.id,
            companyName: company.Name,
            overview: company.Overview,
            industry: company.Industry,
            companySize: company.CompanySize,
            yearEst: company.YearEst,
            generalBe: company.GeneralBe,
            location: company.location,
            phoneNumber: company.Telcontact,
            email: company.Email || '', // Handle null case
            websiteUrl: company.WebsiteURL
        };
    },

    // Update company profile
    async updateCompany(id: number, companyData: any) {
        // Hash password if provided
        let hashedPassword: string | undefined = undefined;
        if (companyData.password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(companyData.password, salt);
        }

        // Build update data object - only include fields that are provided
        const updateData: any = {};

        if (companyData.companyName !== undefined) updateData.Name = companyData.companyName;
        if (companyData.overview !== undefined) updateData.Overview = companyData.overview;
        if (companyData.industry !== undefined) updateData.Industry = companyData.industry; // Fixed typo: was "Industy"
        if (companyData.companySize !== undefined) updateData.CompanySize = companyData.companySize;
        if (companyData.yearEst !== undefined) updateData.YearEst = companyData.yearEst;
        if (companyData.generalBe !== undefined) updateData.GeneralBe = companyData.generalBe;
        if (companyData.location !== undefined) updateData.location = companyData.location;
        if (companyData.phoneNumber !== undefined) updateData.Telcontact = companyData.phoneNumber;
        if (companyData.email !== undefined) updateData.Email = companyData.email;
        if (companyData.websiteUrl !== undefined) updateData.WebsiteURL = companyData.websiteUrl;
        if (hashedPassword) updateData.password = hashedPassword;

        const company = await db.company.update({
            where: { id: parseInt(id.toString()) },
            data: updateData
        });

        return {
            id: company.id,
            companyName: company.Name,
            location: company.location,
            email: company.Email || '' // Handle null case
        };
    }
};