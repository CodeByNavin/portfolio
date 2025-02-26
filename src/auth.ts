import NextAuth from 'next-auth'
import Credentials from "next-auth/providers/credentials"
import AccessSchemas from '@/app/server/db'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async (credentials) => {
            let user = null;
            console.log(credentials)

            const schema = await AccessSchemas('Access');

            const data = await schema?.findOne({
                email: credentials?.email
            })
            console.log(data)
            if (!data) {
                throw new Error("Invalid credentials.")
            }

            if (data?.password === credentials?.password) {
                const ID = data?._id.toString()
                user = { id: ID };
            }
            
            return user;
        }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // You can manage redirects here
      return baseUrl + '/admin';
    }
  }
})