import { Router } from "express";
import passport from "../Config/Passport";
import { register, login, logout } from "../Controller/Auth_Controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  (req, res) => {
    const { token, user } = req.user as any;
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
)
export default router;