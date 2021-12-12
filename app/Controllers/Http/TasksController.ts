import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "App/Models/Task";
import User from "App/Models/User";
import AddTaskValidator from "App/Validators/AddTaskValidator";
import EditTaskValidator from "App/Validators/EditTaskValidator";

export default class TasksController {
  public async allTasks({ session, view }: HttpContextContract) {
    const user = session.get("user");
    const userTask = await User.find(user.id);
    const tasks = await userTask
      ?.related("tasks")
      .query()
      .orderBy("due_date", "desc");

    return view.render("tasks", { tasks: tasks });
  }

  public async addTask({ view, session }: HttpContextContract) {
    const user = session.get("user");
    const userSubject = await User.find(user.id);
    const subjects = await userSubject?.related("subjects").query();
    return view.render("create", { subjects: subjects });
  }

  async taskDetail({ session, params, view }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;
    const userTask = await User.find(user.id);

    const task = await userTask
      ?.related("tasks")
      .query()
      .where("id", id)
      .firstOrFail();

    const taskJson = task?.serialize();
    // console.log(taskJson);

    return view.render("taskDetail", { taskJson: taskJson });
  }

  public async newTask({ session, request, response }: HttpContextContract) {
    const payload = await request.validate(AddTaskValidator);
    try {
      const user = session.get("user");
      const task_name = payload.task_name;
      const description = request.input("description");
      const start_date = request.input("start_date");
      const due_date = request.input("due_date");
      const is_completed = request.input("is_completed");
      const task = new Task();
      task!.userId = user.id;
      task.taskName = task_name;
      task.description = description;
      task.startDate = start_date;
      task.dueDate = due_date;
      task.isCompleted = is_completed;

      session.flash("AddTask", "Add new task complete!");

      await task?.save();
    } catch (error) {
      console.log(error);
    }
    response.redirect().toRoute("home");
  }

  public async editTask({ session, params, view }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;
    const userTask = await User.find(user.id);
    const tasks = await userTask?.related("tasks").query();

    const task = await userTask
      ?.related("tasks")
      .query()
      .where("id", id)
      .firstOrFail();

    return view.render("editTask", { tasks: tasks, edittask: task });
  }
  public async updateTask({
    session,
    params,
    request,
    response,
  }: HttpContextContract) {
    const user = session.get("user");
    const payload = await request.validate(EditTaskValidator);

    const id = params.id;

    const userTask = await User.find(user.id);

    const task = await userTask
      ?.related("tasks")
      .query()
      .where("id", id)
      .firstOrFail();

    task!.taskName = payload.task_name;
    task!.description = request.input("description");

    session.flash("EditTask", "Edit selected task complete!");

    await task?.save();

    response.redirect().toRoute("home");
  }

  public async completeTask({
    session,
    params,
    response,
  }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;

    const userTask = await User.find(user.id);

    const task = await userTask
      ?.related("tasks")
      .query()
      .where("id", id)
      .firstOrFail();
    task!.isCompleted = true;

    session.flash("StatusTask", "Task status has change to complete!");

    await task?.save();

    response.redirect().toRoute("home");
  }

  public async deleteTask({ session, params, response }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;

    const userTask = await User.find(user.id);

    const task = await userTask
      ?.related("tasks")
      .query()
      .where("id", id)
      .firstOrFail();

    session.flash("EditTask", "Delete selected task complete!");

    await task?.delete();

    response.redirect().toRoute("home");
  }
}
