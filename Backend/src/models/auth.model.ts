import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const userModel = {
    // Register a new user
    async register(userData: { password: string; firstName: any; lastName: any; email: any; phoneNumber: any; }) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create user in database
        const user = await prisma.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                Email: userData.email,
                Telphone: userData.phoneNumber,
                password: hashedPassword,
            }
        });

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.Email
        };
    },

    // Login a user
    async login(email, password) {
        // Find the user
        const user = await prisma.user.findFirst({
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
            { id: user.id, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.Email
            }
        };
    },

    // Get user by ID
    async getUserById(id) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.Email,
            phone: user.Telphone
        };
    }
};
