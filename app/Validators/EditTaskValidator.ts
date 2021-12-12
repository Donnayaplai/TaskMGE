import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class EditTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    task_name: schema.string(),
  });

  public messages = {
    required: "{{ field }} is required!",
  };
}
