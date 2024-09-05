import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

// Ensure the database is connected before handling requests
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin, // Include the isAdmin field
          };
        } catch (error) {
          throw new Error("Failed to authorize user");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user; // Pass through user object with isAdmin
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Include isAdmin in token
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15, // Set session expiration to 15 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use cookies securely in production
        sameSite: "lax",
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Next.js App Router expects the handlers to be exported as named exports
export { handler as GET, handler as POST };
