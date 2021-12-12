import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Subject from "App/Models/Subject";
import User from "App/Models/User";
import AddSubjectValidator from "App/Validators/AddSubjectValidator";
export default class SubjectsController {
  public async allSubject({ session, view }: HttpContextContract) {
    const user = session.get("user");
    const userSubject = await User.find(user.id);
    const subjects = await userSubject?.related("subjects").query();
    // console.log(subjects);
    return view.render("subjects", { subjects: subjects });
  }

  public async addSubject({ view, response }: HttpContextContract) {
    response.redirect().toRoute("subject.index");
    return view.render("subjects");
  }

  public async newSubject({ session, request, response }: HttpContextContract) {
    const user = session.get("user");
    const payload = await request.validate(AddSubjectValidator);
    const subject_name = payload.subject_name;
    const subject = new Subject();
    subject!.subjectName = subject_name;
    subject!.userId = user.id;

    await subject?.save();

    session.flash("AddSubject", "Add new subject complete!");

    response.redirect().toRoute("subject.index");
  }

  public async editSubject({ session, params, view }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;
    const userSubject = await User.find(user.id);
    const subjects = await userSubject?.related("subjects").query();

    const subject = await userSubject
      ?.related("subjects")
      .query()
      .where("id", id)
      .firstOrFail();

    return view.render("subjects", {
      editsubject: subject,
      subjects: subjects,
    });
  }

  public async updateSubject({
    session,
    params,
    request,
    response,
  }: HttpContextContract) {
    const user = session.get("user");
    const payload = await request.validate(AddSubjectValidator);

    const id = params.id;

    const userSubject = await User.find(user.id);

    const subject = await userSubject
      ?.related("subjects")
      .query()
      .where("id", id)
      .firstOrFail();

    subject!.subjectName = payload.subject_name;

    session.flash("EditSubject", "Edit subject name complete!");

    await subject?.save();

    response.redirect().toRoute("subject.index");
  }

  public async deleteSubject({
    session,
    params,
    response,
  }: HttpContextContract) {
    const user = session.get("user");
    const id = params.id;

    const userSubject = await User.find(user.id);

    const subject = await userSubject
      ?.related("subjects")
      .query()
      .where("id", id)
      .firstOrFail();
    await subject?.delete();

    session.flash("DeleteSubject", "Delete selected subject complete!");

    response.redirect().toRoute("subject.index");
  }
}
