import express from "express";
import passport from "passport";

import { UserModel } from "../../database/allModels";
import { ValidateSignin, ValidateSignup } from "../../validation/auth";

const Router = express.Router();

/*
Route	      	| 	/signup
Description	  | 	Register new user
Access	    	| 	Public
Parameter   	| 	--
Methods	    	| 	POST
*/
Router.post("/sign-up", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	| 	/signin
Description 	| 	Sign in as existing user
Access	    	| 	Public
Parameter   	| 	--
Methods	    	| 	POST
*/
Router.post("/sign-in", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	| 	/google
Description	  |	  Sign in using google
Access	    	| 	Public
Parameter   	| 	--
Methods		    | 	GET
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/*
Route		      | 	/google/callback
Description 	|	  Google sign in callback 
Access    		|	  Public
Parameter	    | 	--
Methods		    |	  GET
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(
      `https://zomato-master.netlify.app/google/${req.session.passport.user.token}`
    );
  }
);

export default Router;
