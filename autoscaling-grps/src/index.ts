import express from "express";
import cluster from "cluster";
import os from "os";

const total_no_of_cpus = os.cpus.length;
console.log(total_no_of_cpus);

const port = 3000;


// mainly this can happen when we vertical scale 
// there are multiple process run on different cors
// as here express server is working

// javascript dont have ability to make multiple threads as due
// to js is single threaded language
// we try to convert into multiple thread as by fork

// when req comes it can go to any express server using different
// algo like roundrobin and all ...

if (cluster.isPrimary) {
  console.log(`number of cpu's is ${total_no_of_cpus}`);
  console.log(`primary ${process.pid} is running`);

  // process for the workers
  // we are trying to run express server on each cpu cores
  for (let i = 0; i < total_no_of_cpus; i++) cluster.fork();
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.json({
      msg: "hello world",
    });
  });

  app.get("/api/:n", (req, res) => {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;
    for (let i = 0; i < n; i++) {
      count += i;
    }

    res.json({
      msg: `final count is ${count} and ${process.pid}`,
    });
  });

  app.listen(port, () => {
    console.log(`server listens at ${port}`);
  });
}
