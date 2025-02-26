
import Credentials from "next-auth/providers/credentials"
import { GetAccess } from '@/server/server'

export const authOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    return null;
                }

                try {
                    const data = await JSON.parse(await GetAccess(email) as string);

                    if (!data) {
                        return null;
                    }

                    if (data?.password === password) {
                        const user = { id: data?._id.toString(), email: email, name: data?.name };
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Failed to authorize:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user }: any) {
            session.user = user;
            return session;
        },
        async redirect({ url, baseUrl }: any) {
            // You can manage redirects here
            return baseUrl + '/admin';
        }
    },
    pages: {
        signIn: '/signin'
    }
}