import express from "express";
import passport from "passport";
import { UserModel } from "../../database/allModels";

const Router = express.Router();

/*
Route	      	|	  /
Description	  |	  Get authorized user data
Access    		| 	Public
Parameter   	| 	--
Methods	    	| 	GET
*/
Router.get("/", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { email, fullName, phoneNumber, address } =
      req.session.passport.user._doc;

    return res.json({ user: { email, fullName, phoneNumber, address } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route		      | 	/:_id
Description 	|	  Get user data
Access  		  | 	Public
Parameter   	|	  id
Methods		    | 	GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const getUser = await UserModel.findById(_id);
    const { fullName } = getUser;

    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	|	  /update/:_id
Description	  |	  Update user data
Access    		| 	Public
Parameter   	| 	id
Methods	    	| 	PUT
*/
Router.put("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      _id,
      { $set: { userData } },
      { new: true }
    );

    return res.json({ user: updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
