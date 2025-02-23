import {refreshToken, signInUser, signUpUser} from "../controller/authController";
import {Router} from "express";

const router = Router();

router.post('/signup', signUpUser );
router.post('/signin', signInUser);
router.post('/refresh-token', refreshToken);

export default router;