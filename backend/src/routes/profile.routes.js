import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";

const router = Router();    

//profile routes
// router.route("/profile/view").get();
// router.route("/profile/edit").patch();
// router.route("/profile/password").patch();

export default router;  

