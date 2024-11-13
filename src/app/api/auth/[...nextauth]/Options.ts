import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

interface UserWithRole {
  id: string;
  email: string;
  image: string | null;
  name: string;
  status: string;
  role: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.emailVerified === null) {
          throw new Error("User not found.");
        }

        if (user.password) {
          const passwordMatch = bcrypt.compareSync(
            credentials.password,
            user.password,
          );
          if (!passwordMatch) throw new Error("Incorrect password.");
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile: any;
    }) {
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { email: user.email },
              data: { googleId: profile.id },
            });
          }
          user.id = existingUser.id;
          user.status = existingUser.status; // Ensure role/status is available for existing user
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image || null,
              googleId: profile.id,
              password: null,
              status: "USER", // Default role for new users
              emailVerified: new Date(),
            },
          });
          user.id = newUser.id;
          user.status = newUser.status; // Ensure role/status is set for new user
        }
      }
      return true;
    },

    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: UserWithRole;
      trigger?: any;
      session?: Session;
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.status; // Ensure role/status is set in the token
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role, // Set role in the session from token
        },
      };
    },
  } as any,

  session: {
    strategy: "jwt" as "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
