import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { editProfile, updatePassword, viewProfile } from "../controllers/profile.controller.js";
import { isAuthenticated } from "../middlewares/user.middlewares.js";

const router = Router();    

//profile routes
router.route("/profile/view").get(isAuthenticated,viewProfile);
router.route("/profile/edit").patch(isAuthenticated,editProfile);
router.route("/profile/password").patch(isAuthenticated,updatePassword);
// router.route("/profile/password").patch();

export default router;  

