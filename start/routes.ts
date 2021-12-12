import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("home");
});
import "./routes/user";
import "./routes/profile";
import "./routes/tasks";
import "./routes/subject";
