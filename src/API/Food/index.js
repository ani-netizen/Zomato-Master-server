import express from "express";

import { FoodModel } from "../../database/allModels";
import { ValidateCategory, ValidateId } from "../../validation/common";

const Router = express.Router();

/*
Route	      	|	  /:_id
Description	  | 	Get all the Foods details based on the category 
Access        | 	Public
Parameter   	|	  id
Methods	    	|	  GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const foods = await FoodModel.findById(_id);

    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	| 	/r/:_id
Description	  |	  Get all the Foods based on particular restaurants
Access	    	|	  Public
Parameter	    |	  id
Methods		    |	  GET
*/
Router.get("/r/:_id", async (req, res) => {
  try {
    await ValidateId(req.params);
    const { _id } = req.params;
    const Foods = await FoodModel.find({ restaurant: _id });

    return res.json({ Foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	|	  /c/:category
Description	  | 	Get all the Foods details based on the category 
Access        | 	Public
Parameter   	|	  category
Methods	    	|	  GET
*/
Router.get("/c/:category", async (req, res) => {
  try {
    await ValidateCategory(req.params);
    const { category } = req.params;
    const food = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!food) {
      return res
        .status(400)
        .json({ error: "No foods found for this category" });
    }
    return res.json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
