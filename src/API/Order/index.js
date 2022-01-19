import express from "express";
import passport from "passport";
import validateUser from "../../config/validateUser";
import { OrderModel } from "../../database/allModels";

const Router = express.Router();

/*
Route		      | 	/:_id
Description	  | 	Get all the Orders based on id
Access		    | 	Private
Parameter	    | 	id
Methods		    | 	GET
*/
Router.get("/:_id", passport.authenticate("jwt"), async (req, res) => {
  try {
    await validateUser(req, res);
    const { _id } = req.params;

    const getOrders = await OrderModel.findOne({ user: _id });

    if (!getOrders) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ orders: getOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route		      | 	/new/:_id
Description	  | 	Add new order
Access		    | 	Private
Parameter	    | 	id
Methods		    | 	POST
*/
Router.post("/new/:_id", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.params;

    const { orderDetails } = req.body;

    const addNewOrder = await OrderModel.findOneAndUpdate(
      { user: _id },
      { $push: { orderDetails } },
      { new: true }
    );

    return res.json({ orders: addNewOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
