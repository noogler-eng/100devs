import games from "./store";
import logging from "./logger";

const main = () => {
  logging(5);

  games.push({
    id: Math.floor(Math.random() * 1000).toString(),
    blackPairName: "Alice",
    whitePairName: "Bob",
    moves: [],
  });

  const gameId = games[0].id;

  // adding new game
  setInterval(() => {
    console.log("moving ....");
    const game = games.find((item) => item.id == gameId);
    game?.moves.push({
      by: game.blackPairName,
      move: `B${Math.floor(Math.random() * 10)}`,
    });
    game?.moves.push({
      by: game.whitePairName,
      move: `W${Math.floor(Math.random() * 10)}`,
    });
  }, 3 * 1000);
};

main();
