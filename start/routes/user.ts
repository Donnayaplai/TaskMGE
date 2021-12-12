import Route from "@ioc:Adonis/Core/Route";

Route.on("/login").render("login").as("login");
Route.on("/register").render("register").as("register");
Route.post("/users/login", "UsersController.login").as("users.login");
Route.post("/users/register", "UsersController.register").as("users.register");
Route.get("/logout", "UsersController.logout").as("users.logout");
