import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/tasks", "TasksController.allTasks").as("home");
  Route.get("/tasks/add", "TasksController.addTask").as("task.add");
  Route.post("/tasks/new", "TasksController.newTask").as("task.new");
  Route.get("/tasks/:id", "TasksController.taskDetail").as("task.detail");
  Route.get("/tasks/:id/edit", "TasksController.editTask").as("task.edit");
  Route.post("/tasks/:id/update", "TasksController.updateTask").as(
    "task.update"
  );
  Route.get("/tasks/:id/delete", "TasksController.deleteTask").as(
    "task.delete"
  );
  Route.get("/tasks/:id/complete", "TasksController.completeTask").as(
    "task.complete"
  );
}).middleware("auth");
