import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AddTaskValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    task_name: schema.string(),
    // description: schema.string(),
    // start_date: schema.date(),
    // due_date: schema.date(),
  });

  public messages = {
    required: "{{ field }} is required!",
  };
}
