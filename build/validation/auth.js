"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateSignup = exports.ValidateSignin = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidateSignup = function ValidateSignup(userData) {
  var Schema = _joi["default"].object({
    fullName: _joi["default"].string().required(),
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().min(8).max(32),
    phoneNumber: _joi["default"].number(),
    address: _joi["default"].array().items(_joi["default"].object({
      detail: _joi["default"].string(),
      "for": _joi["default"].string()
    }))
  });

  return Schema.validateAsync(userData);
};

exports.ValidateSignup = ValidateSignup;

var ValidateSignin = function ValidateSignin(userData) {
  var Schema = _joi["default"].object({
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required()
  });

  return Schema.validateAsync(userData);
};

exports.ValidateSignin = ValidateSignin;