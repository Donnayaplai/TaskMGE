import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/user/profile", "UsersController.userProfile").as("user.profile");
  Route.get("/user/:id/edit", "UsersController.editUserProfile").as(
    "user.edit"
  );
  Route.post("/user/:id/update", "UsersController.updateUserProfile").as(
    "user.update"
  );
}).middleware("auth");
