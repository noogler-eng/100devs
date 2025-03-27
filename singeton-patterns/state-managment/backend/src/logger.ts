// this will keep updating the data in database in regualr
// interval of time

// here we are just logging the state of game on server
import games from "./store";

const logging = (time: number) => {
  setInterval(() => {
    console.log("game: ", games[0]);
  }, time * 1000);
};

export default logging;
