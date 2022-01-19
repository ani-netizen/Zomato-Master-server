import express from "express";

import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/*
Route		      | 	/list/:_id
Description	  | 	Get all the Menus based on restaurants
Access		    | 	Public
Parameter	    | 	_id
Methods		    | 	GET
*/
Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await MenuModel.findById(_id);

    if (!menus) {
      return res
        .status(404)
        .json({ error: "No menus present for this restaurant" });
    }

    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route		      | 	/image/:_id
Description	  | 	Get all the menu images based on restaurants
Access	    	| 	Public
Parameter	    | 	id
Methods		    | 	GET
*/
Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menuImages = await ImageModel.findOne(_id);

    if (!menuImages) {
      return res
        .status(404)
        .json({ error: "No Images present for this restaurant" });
    }

    return res.json({ menuImages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
