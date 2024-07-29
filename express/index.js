const express = require("express");
const { sequelize } = require("./models");
const app = express();

// we use dotenv to load environment variables from a .env file into process.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// we use express.json() to parse incoming requests with JSON payloads
app.use(express.json());

// this is all the routes in the routes folder that we are importing into the server file to be used
app.use("", require("./routes"));

// this is individual routes that we can create in the server file
// itself without having to create a new file in the routes folder

// app.get("/", (req, res) => {
//   return res.json({ message: "Hello World!" });
// });

// app.get("/test", (req, res) => {
//   res.send("Hello From Test!");
// });

let PORT = process.env.PORT || 3000;

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
