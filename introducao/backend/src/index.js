const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.json({ message: "Hello World 2!"});
});

app.listen(3333, () => {

  console.log("Backend started!");
});