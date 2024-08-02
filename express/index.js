const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();

app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

app.use(express.json());

app.use("", require("./routes"));

let PORT = process.env.PORT || 5000;

const server = app.listen({ port: PORT }, async () => {
  console.log(
    `Server Running on Port ${PORT}, api version ${process.env.VERSION}`
  );
  await sequelize.authenticate();
  console.log("Server Authenticated");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
