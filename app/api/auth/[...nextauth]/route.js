import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

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
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Validate password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return user object
          return {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin, // Include isAdmin in the user object
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
      // Attach user to session from token
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Attach user to token if it exists
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15, // Session expiration time set to 15 days
    updateAge: 24 * 60 * 60,   // Token refresh once per day
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax",  // Ensure session cookies are used properly
        path: "/",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure the secret is set into environment
});

// Export handlers for Next.js App Router
export { handler as GET, handler as POST };
