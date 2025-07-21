import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/user.middlewares.js"

const router = Router();    

//auth routes
router.route("/auth/register").post(userRegister);
router.route("/auth/login").post(userLogin);
router.route("/auth/logout").post(isAuthenticated,userLogout);

export default router;  

