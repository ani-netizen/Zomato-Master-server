import express from "express";

import { RestaurantModel } from "../../database/allModels";
import { ValidateId } from "../../validation/common";
import {
  ValidateRestaurantCity,
  ValidateRestaurantSearchString,
} from "../../validation/restaurant";

const Router = express.Router();

/*
Route	      	|	  /
Description	  |	  Get all the restaurants details based on the city 
Access	    	|	  Public
Parameter	    |	  --
Methods	    	|	  GET
*/
Router.get("/", async (req, res) => {
  try {
    await ValidateRestaurantCity(req.query);
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });

    if (restaurants.length === 0) {
      return res.json({ error: "No restaurants found in this city" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	| 	/
Description	  | 	Get all the restaurants details based on the id 
Access	    	| 	Public
Parameter	    |	  id
Methods	    	| 	GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    await ValidateId(req.params);
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ error: "No restaurant found for this id" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route	      	|	  /search/:searchString
Description	  | 	Get all the restaurants details based on the search string 
Access		    |	  Public
Parameter   	|	  --
Methods		    | 	GET
*/
Router.get("/search/:searchString", async (req, res) => {
  try {
    await ValidateRestaurantSearchString(req.params);
    const { searchString } = req.params;
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });

    if (!restaurants) {
      return res
        .status(404)
        .json({ error: `No restaurants found for ${searchString}` });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
