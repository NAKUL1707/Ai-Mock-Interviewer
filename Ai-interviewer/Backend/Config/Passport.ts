import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../DB/Prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        if (!email) return done(new Error("No email from Google"));

        // find or create user
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name,
              passwordHash: "GOOGLE_AUTH",
            },
          });
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;