"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const logger_1 = __importDefault(require("./logger"));
const main = () => {
    (0, logger_1.default)(5);
    store_1.default.push({
        id: Math.floor(Math.random() * 1000).toString(),
        blackPairName: "Alice",
        whitePairName: "Bob",
        moves: [],
    });
    const gameId = store_1.default[0].id;
    // adding new game
    setInterval(() => {
        console.log("moving ....");
        const game = store_1.default.find((item) => item.id == gameId);
        game === null || game === void 0 ? void 0 : game.moves.push({
            by: game.blackPairName,
            move: `B${Math.floor(Math.random() * 10)}`,
        });
        game === null || game === void 0 ? void 0 : game.moves.push({
            by: game.whitePairName,
            move: `W${Math.floor(Math.random() * 10)}`,
        });
    }, 3 * 1000);
};
main();
