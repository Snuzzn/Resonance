import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  options: {
    session: {
      jwt: true,
      maxAge: 60 * 60,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {async function jwt(token, user) {
    if (user) {
      token = {id: user.id}
    }
  
    return token
  }
},
  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URL,
});
