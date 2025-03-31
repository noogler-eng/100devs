import express from "express";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors());

// function to read file content
const readConfigFile = (filePath: string): string => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:, err`);
    return "";
  }
};

app.get("/", (req: any, res: any) => {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    CACHE_SIZE: process.env.CACHE_SIZE,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
    MAX_CART_ITEMS: process.env.MAX_CART_ITEMS,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  };

  const fileVars = {
    application_properties: readConfigFile(
      "/etc/config/application.properties"
    ),
    database_properties: readConfigFile("/etc/config/database.properties"),
    cache_properties: readConfigFile("/etc/config/cache.properties"),
    payment_properties: readConfigFile("/etc/config/payment.properties"),
  };

  res.send(`
    <h1>ENV Variables</h1>
        <pre>${JSON.stringify(envVars, null, 2)}</pre>
    <h1>CONFIG Files</h1>
        <pre>${JSON.stringify(fileVars, null, 2)}</pre>
    `);
});

const port = process.env.PORT || 4000;
app.listen(Number(port), "0.0.0.0", () => {
  console.log("server starts")
  console.log(`server listens at: http://localhost:${port}`);
});
