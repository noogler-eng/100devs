"use strict";
// this will keep updating the data in database in regualr
// interval of time
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// here we are just logging the state of game on server
const store_1 = __importDefault(require("./store"));
const logging = (time) => {
    setInterval(() => {
        console.log("game: ", store_1.default[0]);
    }, time * 1000);
};
exports.default = logging;
