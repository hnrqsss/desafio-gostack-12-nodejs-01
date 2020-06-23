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

  if(id === undefined || !isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository id' })
  }

  return next()
}

function findRepository(request, response, next) {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found !!!'})
  }

  request.repositoryIndex = repositoryIndex
  request.repository = repositories[repositoryIndex]

  return next()
}

app.use('/repositories/:id', validUuid)
app.use('/repositories/:id', findRepository)

app.get("/repositories", (request, response) => {
  return response.json(repositories)  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body

  const { repositoryIndex, repository } = request

  repositories[repositoryIndex] = {
    ...repository, 
    title,
    url,
    techs,
  }

  return response.json(repositories[repositoryIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { repositoryIndex } = request

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { repositoryIndex } = request

  repositories[repositoryIndex].likes = ++repositories[repositoryIndex].likes
  
  return response.json({ likes: repositories[repositoryIndex].likes })

});

module.exports = app;
