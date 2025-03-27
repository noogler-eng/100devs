// this is fro the in memory which decrease the latency in our
// realtime gameplay or application

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

const games: Game[] = [];

export default games;
