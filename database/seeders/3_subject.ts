import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Subject from "App/Models/Subject";

export default class SubjectSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Subject.createMany([
      {
        subjectName: "FullStack Development",
        userId: 1,
      },
    ]);
  }
}
