"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _allModels = require("../../database/allModels");

var _auth = require("../../validation/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Router = _express["default"].Router();
/*
Route	      	| 	/signup
Description	  | 	Register new user
Access	    	| 	Public
Parameter   	| 	--
Methods	    	| 	POST
*/


Router.post("/sign-up", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newUser, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _auth.ValidateSignup)(req.body.credentials);

          case 3:
            _context.next = 5;
            return _allModels.UserModel.findByEmailAndPhone(req.body.credentials);

          case 5:
            _context.next = 7;
            return _allModels.UserModel.create(req.body.credentials);

          case 7:
            newUser = _context.sent;
            token = newUser.generateJwtToken();
            return _context.abrupt("return", res.status(200).json({
              token: token,
              status: "success"
            }));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              error: _context.t0.message
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/*
Route	      	| 	/signin
Description 	| 	Sign in as existing user
Access	    	| 	Public
Parameter   	| 	--
Methods	    	| 	POST
*/

Router.post("/sign-in", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _auth.ValidateSignin)(req.body.credentials);

          case 3:
            _context2.next = 5;
            return _allModels.UserModel.findByEmailAndPassword(req.body.credentials);

          case 5:
            user = _context2.sent;
            token = user.generateJwtToken();
            return _context2.abrupt("return", res.status(200).json({
              token: token,
              status: "success"
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              error: _context2.t0.message
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/*
Route	      	| 	/google
Description	  |	  Sign in using google
Access	    	| 	Public
Parameter   	| 	--
Methods		    | 	GET
*/

Router.get("/google", _passport["default"].authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
}));
/*
Route		      | 	/google/callback
Description 	|	  Google sign in callback 
Access    		|	  Public
Parameter	    | 	--
Methods		    |	  GET
*/

Router.get("/google/callback", _passport["default"].authenticate("google", {
  failureRedirect: "/"
}), function (req, res) {
  return res.redirect("http://localhost:3000/google/".concat(req.session.passport.user.token));
});
var _default = Router;
exports["default"] = _default;