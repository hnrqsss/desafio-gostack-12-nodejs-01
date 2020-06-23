const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Middlewares
function validUuid(request, response, next) {
  const { id } = request.params

  if(!id || !isUuid(id)) {
    return response.status.json({ error: 'Invalid repository id' })
  }

  return next()
}

app.use('/repositories/:id', validUuid)

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
