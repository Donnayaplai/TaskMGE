import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import LoginUserValidator from "App/Validators/LoginUserValidator";
import Hash from "@ioc:Adonis/Core/Hash";
import EditProfileValidator from "App/Validators/EditProfileValidator";

export default class UsersController {
  async login({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(LoginUserValidator);
    const email = payload.email;
    const password = payload.password;
    try {
      const user = await User.findByOrFail("email", email);
      if (user) {
        if (await Hash.verify(user.password, password)) {
          session.put("user", { id: user.id, email: user.email });
          response.redirect().toRoute("home");
        } else {
          throw "Email or password is incorrect!";
        }
      }
    } catch (error) {
      session.flash("error", "The user is not authorized! Please try again");
      response.redirect().toRoute("login");
    }
  }

  async register({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator);

    await User.create({
      firstName: payload.first_name,
      lastName: payload.last_name,
      email: payload.email,
      password: payload.password,
    });

    session.flash(
      "RegisterSuccess",
      "You've been registered successfully, Please login!"
    );

    response.redirect().toRoute("login");
  }

  async logout({ session, response }: HttpContextContract) {
    session.clear();
    response.redirect().toRoute("login");
  }

  async userProfile({ session, view }: HttpContextContract) {
    const user = session.get("user");
    const userProfile = await User.query().where("id", user.id).firstOrFail();

    return view.render("profile", { user: userProfile });
  }

  public async editUserProfile({ view, params, session }: HttpContextContract) {
    const user = session.get("user");
    const userProfile = await User.query().where("id", user.id).firstOrFail();
    const id = params.id;
    const useredit = await User.find(id);
    console.log(id);

    return view.render("profile", {
      userProfile: userProfile,
      useredit: useredit,
    });
  }

  public async updateUserProfile({
    session,
    request,
    response,
  }: HttpContextContract) {
    const user = session.get("user");
    const payload = await request.validate(EditProfileValidator);
    const userProfile = await User.find(user.id);

    userProfile!.firstName = payload.first_name;
    userProfile!.lastName = payload.last_name;

    session.flash("EditProfileSuccess", "Edit your profile sucessfully!");

    await userProfile?.save();

    response.redirect().toRoute("user.profile");
  }
}
