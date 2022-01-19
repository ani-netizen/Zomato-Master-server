import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/*
Route	      	| 	/:_id
Description	  |	  Get all the reviews for a particular restaurant
Access	    	|	  Public
Parameter	    |	  id
Methods		    | 	GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const reviews = await ReviewModel.find({ restaurants: _id });

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	|   /new
Description	  | 	Adding new food/restaurants review and rating
Access	    	| 	Private
Parameter   	| 	--
Methods		    |	  POST
*/
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.session.passport.user._doc;
    const reviewData = req.body;

    await ReviewModel.create({ ...reviewData, user: _id });

    return res.json({ reviews: "Successfully Created Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     		|	  /delete/:_id
Description	  |	  Delete a specific review
Access	    	|	  Public
Parameter	    |	  id
Methods	    	|	  DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Successfully deleted the review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
