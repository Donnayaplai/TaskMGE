import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Task from "App/Models/Task";
import { DateTime } from "luxon";

export default class TaskSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Task.createMany([
      {
        taskName: "FullStack Web",
        description: "Web application",
        startDate: DateTime.local(),
        dueDate: DateTime.local(),
        isCompleted: false,
        userId: 1,
      },
    ]);
  }
}
