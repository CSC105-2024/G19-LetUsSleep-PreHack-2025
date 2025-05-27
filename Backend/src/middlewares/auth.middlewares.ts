import type { Context, Next } from "hono";
import { sign, verify } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";
import { db } from "../index.js";

export const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";
export const USER_COOKIE_NAME = "auth_token";
export const COMPANY_COOKIE_NAME = "company_auth_token";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
};

// Helper function to set user auth cookie
export const setUserAuthCookie = async (c: Context, payload: { userId: number; email: string }) => {
    const token = await sign({
        ...payload,
        type: 'user',
        exp: Math.floor(Date.now() / 1000) + cookieOptions.maxAge
    }, JWT_SECRET);

    setCookie(c, USER_COOKIE_NAME, token, cookieOptions);
    return token;
};

// Helper function to set company auth cookie
export const setCompanyAuthCookie = async (c: Context, payload: { companyId: number; email: string }) => {
    const token = await sign({
        ...payload,
        type: 'company',
        exp: Math.floor(Date.now() / 1000) + cookieOptions.maxAge
    }, JWT_SECRET);

    setCookie(c, COMPANY_COOKIE_NAME, token, cookieOptions);
    return token;
};

// Helper function to clear auth cookies
export const clearAuthCookies = (c: Context) => {
    setCookie(c, USER_COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
    setCookie(c, COMPANY_COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
};

// General authentication middleware - checks for any valid token
export const authMiddleware = async (c: Context, next: Next) => {
    try {
        // Try to get tokens from cookies
        const userToken = getCookie(c, USER_COOKIE_NAME);
        const companyToken = getCookie(c, COMPANY_COOKIE_NAME);

        // Fallback to Authorization header
        let headerToken = null;
        const authHeader = c.req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            headerToken = authHeader.split(" ")[1];
        }

        const token = userToken || companyToken || headerToken;

        if (!token) {
            return c.json({ error: "Authentication required" }, 401);
        }

        try {
            // Verify the token
            const decoded = await verify(token, JWT_SECRET) as any;

            if (decoded.type === 'user') {
                // Check if user exists in database
                const user = await db.user.findUnique({
                    where: { id: decoded.userId }
                });

                if (!user) {
                    return c.json({ error: "User not found" }, 401);
                }

                // Add user info to context
                c.set("userId", user.id);
                c.set("userEmail", user.Email || '');
                c.set("userType", "user");
                c.set("user", user);

            } else if (decoded.type === 'company') {
                // Check if company exists in database
                const company = await db.company.findUnique({
                    where: { id: decoded.companyId }
                });

                if (!company) {
                    return c.json({ error: "Company not found" }, 401);
                }

                // Add company info to context
                c.set("companyId", company.id);
                c.set("companyEmail", company.Email || '');
                c.set("userType", "company");
                c.set("company", company);
            } else {
                return c.json({ error: "Invalid token type" }, 401);
            }

            await next();
        } catch (error) {
            return c.json({ error: "Invalid or expired token" }, 401);
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return c.json({ error: "Authentication error" }, 500);
    }
};

// User-specific middleware - only allows users
export const userAuthMiddleware = async (c: Context, next: Next) => {
    try {
        // Try to get user token from cookie first
        let token = getCookie(c, USER_COOKIE_NAME);

        // Fallback to Authorization header
        if (!token) {
            const authHeader = c.req.header("Authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return c.json({ error: "User authentication required" }, 401);
        }

        try {
            // Verify the token
            const decoded = await verify(token, JWT_SECRET) as any;

            if (decoded.type !== 'user') {
                return c.json({ error: "User access only" }, 403);
            }

            // Check if user exists in database
            const user = await db.user.findUnique({
                where: { id: decoded.userId }
            });

            if (!user) {
                return c.json({ error: "User not found" }, 401);
            }

            // Add user info to context
            c.set("userId", user.id);
            c.set("userEmail", user.Email || '');
            c.set("userType", "user");
            c.set("user", user);

            await next();
        } catch (error) {
            return c.json({ error: "Invalid or expired user token" }, 401);
        }
    } catch (error) {
        console.error("User auth middleware error:", error);
        return c.json({ error: "User authentication error" }, 500);
    }
};

// Company-specific middleware - only allows companies
export const companyAuthMiddleware = async (c: Context, next: Next) => {
    try {
        // Try to get company token from cookie first
        let token = getCookie(c, COMPANY_COOKIE_NAME);

        // Fallback to Authorization header
        if (!token) {
            const authHeader = c.req.header("Authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return c.json({ error: "Company authentication required" }, 401);
        }

        try {
            // Verify the token
            const decoded = await verify(token, JWT_SECRET) as any;

            if (decoded.type !== 'company') {
                return c.json({ error: "Company access only" }, 403);
            }

            // Check if company exists in database
            const company = await db.company.findUnique({
                where: { id: decoded.companyId }
            });

            if (!company) {
                return c.json({ error: "Company not found" }, 401);
            }

            // Add company info to context
            c.set("companyId", company.id);
            c.set("companyEmail", company.Email || '');
            c.set("userType", "company");
            c.set("company", company);

            await next();
        } catch (error) {
            return c.json({ error: "Invalid or expired company token" }, 401);
        }
    } catch (error) {
        console.error("Company auth middleware error:", error);
        return c.json({ error: "Company authentication error" }, 500);
    }
};

// Optional middleware - doesn't block if no token, but sets context if token exists
export const optionalAuthMiddleware = async (c: Context, next: Next) => {
    try {
        const userToken = getCookie(c, USER_COOKIE_NAME);
        const companyToken = getCookie(c, COMPANY_COOKIE_NAME);

        let headerToken = null;
        const authHeader = c.req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            headerToken = authHeader.split(" ")[1];
        }

        const token = userToken || companyToken || headerToken;

        if (token) {
            try {
                const decoded = await verify(token, JWT_SECRET) as any;

                if (decoded.type === 'user') {
                    const user = await db.user.findUnique({
                        where: { id: decoded.userId }
                    });

                    if (user) {
                        c.set("userId", user.id);
                        c.set("userEmail", user.Email || '');
                        c.set("userType", "user");
                        c.set("user", user);
                    }
                } else if (decoded.type === 'company') {
                    const company = await db.company.findUnique({
                        where: { id: decoded.companyId }
                    });

                    if (company) {
                        c.set("companyId", company.id);
                        c.set("companyEmail", company.Email || '');
                        c.set("userType", "company");
                        c.set("company", company);
                    }
                }
            } catch (error) {
                // Token is invalid, but we don't block the request
                console.log("Optional auth: Invalid token provided");
            }
        }

        await next();
    } catch (error) {
        console.error("Optional auth middleware error:", error);
        await next(); // Continue even if there's an error
    }
};