"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateId = exports.ValidateCategory = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidateId = function ValidateId(id) {
  var Schema = _joi["default"].object({
    _id: _joi["default"].string().required()
  });

  return Schema.validateAsync(id);
};

exports.ValidateId = ValidateId;

var ValidateCategory = function ValidateCategory(category) {
  var Schema = _joi["default"].object({
    category: _joi["default"].string().required()
  });

  return Schema.validateAsync(category);
};

exports.ValidateCategory = ValidateCategory;