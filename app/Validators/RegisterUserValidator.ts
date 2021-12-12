import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string({}, [
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
  });

  public messages = {
    required: "{{ field }} is required!",
    minLength: "{{ field }} must have at least {{ options.minLength }} length!",
    "email.unique": "This email is already taken!",
  };
}
