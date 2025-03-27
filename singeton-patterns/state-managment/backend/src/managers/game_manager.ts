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

class GameManager {
  games: Game[];

  constructor() {
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

export default GameManager;
