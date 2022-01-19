import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import connectDB from "./database/connection";

import googleConfig from "./config/google.config";
import privateRouteConfig from "./config/route.config";

import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Order";
import Review from "./API/Review";
import User from "./API/User";

googleConfig(passport);
privateRouteConfig(passport);

const zomato = express();

zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());

zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/user", User);

const PORT = process.env.PORT || 4000;

zomato.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log("MY EXPRESS APP IS RUNNING...");
    })
    .catch((error) => {
      console.log("Server running but database connection failed");
      console.log(error);
    });
});
