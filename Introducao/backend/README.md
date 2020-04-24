Por padrão o script no parametro "script" do package.json vai tentar executar o arquivo do parametro "main" por isso

Métodos HTTP

GET: Busca informações do back-end
POST: Cria informações no back-end
PUT: Alterar informações no back-end
PATCH: Alterar algo especifico no back-end
DELETE: Deletar uma informação no back-end

Tipos de Parâmetros:

Query Params:
  Filtros e paginação
  Ex: localhost:3333/projects?createdDate=20/04/2020&page=3
  request.query

Route Params:
  Identificar recursos (Atualização/Edição)
  Ex: localhost:3333/projects/4
  request.params

Request Params:
  Conteúdo na hora de criar/atualizar um recurso
  Ex: localhost:3333/projects (JSON)
  request.body

  Por padrão o express não interpreta JSON, para isso devemos adicionar app.use(express.json())


  Middleware:

    É um interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
