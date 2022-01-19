"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _passport = _interopRequireDefault(require("passport"));

var _connection = _interopRequireDefault(require("./database/connection"));

var _google = _interopRequireDefault(require("./config/google.config"));

var _route = _interopRequireDefault(require("./config/route.config"));

var _Auth = _interopRequireDefault(require("./API/Auth"));

var _Restaurant = _interopRequireDefault(require("./API/Restaurant"));

var _Food = _interopRequireDefault(require("./API/Food"));

var _Menu = _interopRequireDefault(require("./API/Menu"));

var _Image = _interopRequireDefault(require("./API/Image"));

var _Order = _interopRequireDefault(require("./API/Order"));

var _Review = _interopRequireDefault(require("./API/Review"));

var _User = _interopRequireDefault(require("./API/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _google["default"])(_passport["default"]);
(0, _route["default"])(_passport["default"]);
var zomato = (0, _express["default"])();
zomato.use((0, _cors["default"])());
zomato.use(_express["default"].json());
zomato.use((0, _helmet["default"])());
zomato.use(_passport["default"].initialize());
zomato.use("/auth", _Auth["default"]);
zomato.use("/restaurant", _Restaurant["default"]);
zomato.use("/food", _Food["default"]);
zomato.use("/menu", _Menu["default"]);
zomato.use("/image", _Image["default"]);
zomato.use("/order", _Order["default"]);
zomato.use("/review", _Review["default"]);
zomato.use("/user", _User["default"]);
var PORT = process.env.PORT || "4000";
zomato.listen(PORT, function () {
  (0, _connection["default"])().then(function () {
    console.log("MY EXPRESS APP IS RUNNING...");
  })["catch"](function (error) {
    console.log("Server running but database connection failed");
    console.log(error);
  });
});