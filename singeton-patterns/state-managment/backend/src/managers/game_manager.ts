// classes
interface Game {
  id: string;
  whitePairName: string;
  blackPairName: string;
  moves: {
    by: string;
    move: string;
  }[];
}
[];

// static variables, static methods - directly associated with the class not object
class GameManager {
  // now this is associated with the class
  games: Game[];
  private static instance: GameManager;

  // making the constructor private so that no one can call it from outside
  private constructor() {
    this.games = [];
  }

  // static method
  // doing it on the class not an object
  static getInstance() {
    if (GameManager.instance) return GameManager.instance;
    // if instance is not exist then making new instance and returning
    GameManager.instance = new GameManager();
    return GameManager.instance;
  }

  clear() {
    this.games = [];
  }

  getId() {
    return Math.floor(Math.random() * 1000).toString();
  }

  addGame(data: { whitePairName: string; blackPairName: string }) {
    const new_game = {
      id: this.getId(),
      whitePairName: data.whitePairName,
      blackPairName: data.blackPairName,
      moves: [],
    };
    this.games.push(new_game);
  }

  addMove(data: { id: string; by: string; move: string }) {
    const game = this.games.find((item) => item.id == data.id);
    if (!game) {
      console.log(`game not found by this id: ${data.id}`);
      return;
    }

    game.moves.push({
      by: data.by,
      move: data.move,
    });

    console.log(`move added successfully ${data.id}`);
  }

  getGameById(id: string): Game | null {
    return this.games.find((game) => game.id === id) || null;
  }

  getAllGames(): Game[] {
    return this.games;
  }

  log(time: number) {
    setInterval(() => {
      console.log(this.getAllGames());
    }, time * 1000);
  }
}

// everyone using the same instance
export default GameManager.getInstance();

// sngletone pattern menas we can create a single instance of anything
// we can;t able to create other instances (common pattern)
// no other one will be able to call the constructor
// in js and ts -> we use singletons and strategy pattern(also not much used)
// make the constructor private
