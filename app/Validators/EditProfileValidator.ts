import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class EditProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
  });

  public messages = {
    required: "{{ field }} is required!",
  };
}
