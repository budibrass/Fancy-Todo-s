const express = require("express");
const route = express.Router();
const TodoController = require("../controllers/TodoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.use(authentication);

route.get("/", TodoController.showTodo);
route.post("/", TodoController.addTodo);
route.get("/:id", authorization, TodoController.getOneTodo);
route.put("/:id", authorization, TodoController.editTodo);
route.delete("/:id", authorization, TodoController.deleteTodo);

module.exports = route;